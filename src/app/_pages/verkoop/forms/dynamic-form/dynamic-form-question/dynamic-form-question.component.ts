import {Component, Input} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {QuestionBase} from '../model/question-base';
import {HubspotService} from "../../../../../_services/hubspot.service";
import {DealConfig} from "../../../../../_models/hubspot/DealConfig";
import {Values} from "../../../../../_models/hubspot/Values";
import {Editor, Toolbar} from "ngx-editor";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  @Input() dealConfig: DealConfig;
  progress: { percentage: number } = { percentage: 0 };
  uploading = false;
  timestamp = Date.now();
  selectedFiles: FileList | null;
  isImageInvalid = false;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private hubService: HubspotService) {
    this.editor = new Editor();
  }

  get isRequired() {
    return this.question.validators.indexOf(Validators.required) !== -1
  }

  get isShow() {
    return this.question.dependent ? this.question.dependent?.values.includes(this.form.controls[this.question.dependent?.field].value) : true;
  }

  save() {
    this.dealConfig.values = new Values(this.form.getRawValue());
    for (const [k, v] of Object.entries(this.dealConfig.values)) {
      if (Array.isArray(v)) {
        // @ts-ignore
        this.dealConfig.values[k] = v.toString();
      }
    }
    this.hubService.updateDealConfig(this.dealConfig, this.dealConfig.id).subscribe();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  selectFile(event: any) {
    this.uploading = true;
    this.selectedFiles = event.target.files;
    this.isImageInvalid = false;
    // @ts-ignore
    if (this.selectedFiles.item(0).size > 5000000) {
      this.isImageInvalid = true;
      this.selectedFiles = null;
    } else {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        this.hubService.saveImage(file, this.question.key+'-'+this.dealConfig.values.deal_id).subscribe(r => {
          if (r.type === HttpEventType.UploadProgress) {
            // @ts-ignore
            this.progress.percentage = Math.round(100 * r.loaded / r.total);
          } else if (r instanceof HttpResponse) {
            // @ts-ignore
            this.getProperty(this.question.key).url = r.body;
            this.timestamp = Date.now();
            this.save();
            this.uploading = false;
          }
        });
      }
    }
  }

  getProperty(name: string)
  {
    return this.dealConfig.values[name as keyof Values];
  }
}

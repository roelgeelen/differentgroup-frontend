import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {QuestionBase} from '../model/question-base';
import {HubspotService} from "../../../../../_services/hubspot.service";
import {DealConfig} from "../../../../../_models/hubspot/DealConfig";
import {Values} from "../../../../../_models/hubspot/Values";
import {Editor, Toolbar} from "ngx-editor";

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  @Input() dealConfig: DealConfig;
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

  get isValid() {
    return this.form.controls[this.question.key].valid;
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
}

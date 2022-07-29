import {Component, OnInit} from '@angular/core';
import {FormGroup, ValidationErrors} from '@angular/forms';
import {QuestionControlService} from "../dynamic-form/question-control.service";
import {DealConfig} from "../../../../_models/hubspot/DealConfig";
import {Values} from "../../../../_models/hubspot/Values";
import {HubspotService} from "../../../../_services/hubspot.service";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {User} from "../../../../_models/User";
import Swal from 'sweetalert2'
import {ActivatedRoute} from "@angular/router";
import {forms} from "./forms";
import {FormPage} from "../dynamic-form/model/formPage";
import {FormsEnum} from "../dynamic-form/model/formsEnum";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [QuestionControlService]
})
export class FormComponent implements OnInit {
  page: FormPage;
  currentUser: User;
  dealConfig: DealConfig;
  fullscreen = false;
  form!: FormGroup;
  error: string = '';
  loading = false;
  tabIndex = 0;
  tabCount: number;

  constructor(
    private qcs: QuestionControlService,
    private hubService: HubspotService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(queryParams => {
      this.dealConfig = new DealConfig()
      this.dealConfig.values = new Values();
      // @ts-ignore
      this.page = forms[queryParams.get('form')];
      this.tabCount = this.page.form.length;
      this.form = this.qcs.toFormGroup(this.page.form);
      // this.dealConfig.values.deal_id = 5132614621;
      // this.findDeal();
    });
  }

  findDeal() {
    this.loading = true;
    if (this.dealConfig.values.deal_id != null) {
      this.hubService.getDeal(this.dealConfig.values.deal_id).subscribe(deal => {
        this.dealConfig = deal;
        this.dealConfig.values.adviseur = this.currentUser.name;
        this.dealConfig.values.title = this.page.title;
        this.setCustomValues();
        this.setStringToArrays();
        for (const key in this.dealConfig.values) {
          if (this.dealConfig.values[key as keyof Values] === null || this.dealConfig.values[key as keyof Values].length == 0) {
            // @ts-ignore
            this.dealConfig.values[key] = this.form.get(key)?.value;
          }
          if (this.form.get(key) == null) {
            delete this.dealConfig.values[key as keyof Values];
          }
        }
        this.loading = false;
        this.form.setValue(this.dealConfig.values);
      }, error => {
        this.loading = false;
        this.error = 'Kon deal niet vinden.';
      });
    } else {
      this.error = 'Vul eerst deal nummer in!';
    }
  }

  clear() {
    this.dealConfig.values = new Values();
  }

  getFormValidationErrors(): string[] {
    let formError: string[] = [];
    Object.keys(this.form.controls).forEach(key => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          formError.push(key)
        });
      }
    });
    return formError;
  }


  submit() {
    this.loading = true;
    let articles = this.getArticles();
    this.page.form.map(t => {
      return t.questions;
    }).flat().forEach(q => {
      if (q.options.length != 0) {
        const option = q.options.find(o => {
          return o.value == this.dealConfig.values[q.key as keyof Values]
        })
        if (option?.article !== undefined) {
          articles.push(option.article)
        }
      }
    })
    console.log(articles);
    this.hubService.createInvoice(articles, this.dealConfig.values.deal_id).subscribe(t => {
      Swal.fire({
        title: 'Gelukt!',
        html: `<a href="https://info.differentdoors.nl/montage-configuratie/${this.dealConfig.values.deal_id}" target="_blank">Bekijk hier de configuratie</a>`,
        icon: 'success',
        confirmButtonText: 'sluiten'
      });
      this.loading = false;
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Er is iets fout gegaan, probeer het later nog eens',
        icon: 'error',
        confirmButtonText: 'sluiten'
      });
      this.loading = false;
    });


  }

  getArticles(): string[] {
    if (this.page.type == FormsEnum.odo) {
      const maat = Math.ceil((((this.dealConfig.values.breedte < 2000 ? 2000 : this.dealConfig.values.breedte) - 2000) / 100) + 1) + (Math.ceil(((this.dealConfig.values.hoogte < 2000 ? 2000 : this.dealConfig.values.hoogte) - 2000) / 100) * 11)
      return [...this.page.articles, 'ODO0' + maat, 'ODO' + (maat + 99)];
    }
    if (this.page.type == FormsEnum.sdh) {
      let maat = (Math.ceil(this.dealConfig.values.breedte / 500) * 500 - 2500) / 500 * 2 + 1;
      maat = maat < 1 ? 1 : maat;
      if (this.dealConfig.values.hoogte > 2500){
        maat++;
      }
      return [...this.page.articles, 'SDH0'+ ('0' + maat).slice(-2), 'SDH'+ (maat+100)]
    }
    return this.page.articles;
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  public next() {
    this.tabIndex = (this.tabIndex + 1) % this.tabCount;
  }

  public prev() {
    this.tabIndex = (this.tabIndex - 1) % this.tabCount;
  }

  private setCustomValues() {
    let customQuestions: any[] = [];
    this.page.form.forEach(element => {
      customQuestions.push(...element.questions.filter(q => q.other));
    });
    customQuestions.forEach(q => {
      let val = this.dealConfig.values[q.key as keyof Values];
      if (val != null && val != '') {
        if (q.controlType == 'checkbox') {
          val.split(',').forEach((v: string) => {
            if (q.options.filter((o: { value: string; }) => o.value == v).length == 0) {
              q.custom = v;
            }
          })
        } else {
          if (q.options.filter((o: { value: string; }) => o.value == val).length == 0) {
            q.custom = val;
          }
        }
      }
    });
  }

  private setStringToArrays() {
    let questions: any[] = [];
    this.page.form.forEach(element => {
      questions.push(...element.questions.filter(q => q.controlType == 'checkbox'));
    });
    questions.forEach(q => {
      // @ts-ignore
      this.dealConfig.values[q.key] = this.dealConfig.values[q.key as keyof Values] != null ? this.dealConfig.values[q.key as keyof Values].split(',') : [];
    })
  }

  onSubmit() {

  }
}

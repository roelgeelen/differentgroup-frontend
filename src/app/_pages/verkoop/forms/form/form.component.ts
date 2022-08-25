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
import {forms} from "../dynamic-form/forms";
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
  dealId: number;

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
      this.dealId = +queryParams.get('dealId');
      if (queryParams.get('configId') !== null) {
        // @ts-ignore
        this.findDeal(+queryParams.get('configId'));
      }
    });
  }

  findDeal(configId: number) {
    if (configId != null) {
      this.loading = true;
      this.hubService.getConfig(this.dealId, configId).subscribe(deal => {
        console.log(deal)
        this.dealConfig = deal;
        this.dealConfig.values.adviseur = this.currentUser.name;
        this.page = this.getFormPage(this.dealConfig.values.title);
        this.loading = false;
        this.tabCount = this.page.form.length;
        this.form = this.qcs.toFormGroup(this.page.form);
        this.setCustomValues();
        this.setStringToArrays();
        this.setEmptyImages();
        for (const key in this.dealConfig.values) {
          if (this.dealConfig.values[key as keyof Values] === null || this.dealConfig.values[key as keyof Values].length == 0) {
            // @ts-ignore
            this.dealConfig.values[key] = this.form.get(key)?.value;
          }
          if (this.form.get(key) == null) {
            delete this.dealConfig.values[key as keyof Values];
          }
        }
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
    location.replace('/verkoop/formulier?deal='+this.dealConfig.values.deal_id)
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
        // @ts-ignore
        this.dealConfig.values[q.key as keyof Values] =
          q.controlType == 'checkbox' && !Array.isArray(this.dealConfig.values[q.key as keyof Values]) && this.dealConfig.values[q.key as keyof Values] != '' ?
            JSON.parse(this.dealConfig.values[q.key as keyof Values]):
            this.dealConfig.values[q.key as keyof Values];

        if (Array.isArray(this.dealConfig.values[q.key as keyof Values])) {
          this.dealConfig.values[q.key as keyof Values].forEach((v: string) => {
            const option = q.options.find(o => {
              return o.value == v
            });
            if (option?.article !== undefined) {
              articles.push(option.article);
            }
          })
        } else {
          const option = q.options.find(o => {
            return o.value == this.dealConfig.values[q.key as keyof Values]
          });
          if (option?.article !== undefined) {
            articles.push(option.article);
          }
        }
      }
    })
    if (articles.includes('SDH301') && articles.includes('SDH100')) {
      articles.forEach((v, i) => {
        if (v == 'SDH301'){
          articles.splice(i, 1, 'SDH302')
        }
      })
    }
    console.log(articles);
    this.hubService.createInvoice(this.dealConfig.values.deal_id, this.dealConfig.id, articles).subscribe(t => {
      Swal.fire({
        title: 'Gelukt!',
        html: `<a href="https://info.differentdoors.nl/configuratie-menu/deal/${this.dealConfig.values.deal_id}" target="_blank">Bekijk hier de configuratie</a>`,
        icon: 'success',
        confirmButtonColor: '#2e3785',
        confirmButtonText: 'sluiten'
      });
      this.loading = false;
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Er is iets fout gegaan, probeer het later nog eens',
        icon: 'error',
        confirmButtonColor: '#2e3785',
        confirmButtonText: 'sluiten'
      });
      this.loading = false;
    });


  }

  getArticles(): string[] {
    let articles = [...this.page.articles];
    // ODO
    if (this.page.type == FormsEnum.odo) {
      const maat = Math.ceil((((this.dealConfig.values.breedte < 2000 ? 2000 : this.dealConfig.values.breedte) - 2000) / 100) + 1) + (Math.ceil(((this.dealConfig.values.hoogte < 2000 ? 2000 : this.dealConfig.values.hoogte) - 2000) / 100) * 11)
      return [...articles, 'ODO0' + maat, 'ODO' + (maat + 99)];
    }

    //SDH
    if (this.page.type == FormsEnum.sdh) {
      for (var afm of Array.isArray(this.dealConfig.values.deur_afmetingen) ? this.dealConfig.values.deur_afmetingen : JSON.parse(this.dealConfig.values.deur_afmetingen)) {
        let maat = (Math.ceil(afm.breedte / 500) * 500 - 2500) / 500 * 2 + 1;
        maat = maat < 1 ? 1 : maat;
        if (afm.hoogte > 2500) {
          maat++;
        }
        if (this.form.controls['type_sectionaaldeur'].value != 'type_sectionaaldeur') {
          articles.push('SDH' + (maat + 100))
        }
        articles.push('SDH0' + ('0' + maat).slice(-2));
      }
    }
    return articles;
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  public next() {
    window.scroll(0,0);
    this.tabIndex = (this.tabIndex + 1) % this.tabCount;
  }

  public prev() {
    window.scroll(0,0);
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
          JSON.parse(val).forEach((v: string) => {
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
      questions.push(...element.questions.filter(q => q.controlType == 'checkbox' || q.controlType == 'table'));
    });
    questions.forEach(q => {
      // @ts-ignore
      this.dealConfig.values[q.key] = this.dealConfig.values[q.key as keyof Values] != '' ? JSON.parse(this.dealConfig.values[q.key as keyof Values]) : [];
    })
  }

  private setEmptyImages() {
    let questions: any[] = [];
    this.page.form.forEach(element => {
      questions.push(...element.questions.filter(q => q.controlType == 'upload'));
    });
    questions.forEach(q => {
      // @ts-ignore
      this.dealConfig.values[q.key] = this.dealConfig.values[q.key as keyof Values]?.url ? this.dealConfig.values[q.key as keyof Values] : { url: '', type: 'image' };
    })
  }

  getFormPage(title: string|undefined) {
    return Object.values(forms).filter(k => {
      return k.title == title;
    })[0]
  }
}

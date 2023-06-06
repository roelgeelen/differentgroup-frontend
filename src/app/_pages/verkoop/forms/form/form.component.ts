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
import {BehaviorSubject, Observable} from "rxjs";
import {Article} from "../dynamic-form/model/article";
import {QuestionBase} from "../dynamic-form/model/question-base";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [QuestionControlService]
})
export class FormComponent implements OnInit {
  private durationSubject: BehaviorSubject<number>;
  public totalDuration: Observable<number>;
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
  publishing = false;
  editTitle = false;

  constructor(
    private qcs: QuestionControlService,
    private hubService: HubspotService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.durationSubject = new BehaviorSubject<number>(0);
    this.totalDuration = this.durationSubject.asObservable();
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.fullscreen = queryParams.get('fullscreen') == 'true';
    });
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
        this.dealConfig = deal;
        this.dealConfig.values.adviseur = this.currentUser.name;
        this.page = this.getFormPage(this.dealConfig.values.type);
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
        this.form.patchValue(this.dealConfig.values);
        this.updateDuration();
      }, error => {
        this.loading = false;
        this.error = 'Kon deal niet vinden.';
      });
    } else {
      this.error = 'Vul eerst deal nummer in!';
    }
  }

  clear() {
    location.replace('/verkoop/formulier?deal=' + this.dealConfig.values.deal_id)
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

  updateTitle() {
    if (this.dealConfig.values.title != undefined) {
      this.form.patchValue(this.dealConfig.values);
      this.hubService.updateConfigTitle(this.dealConfig.values.deal_id, this.dealConfig.id, this.dealConfig.values.title).subscribe(() => {
        this.publish();
      });
    }
  }

  submit() {
    this.emptyNonVisibleFields();
    Swal.fire({
      title: 'Wil je de artikelen toevoegen aan de huidige offerte?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Ja, toevoegen',
      confirmButtonColor: '#2e3785',
      denyButtonText: `Nee, vervangen`,
      cancelButtonText: 'Annuleren'
    }).then((result) => {
      if (!result.isDismissed) {
        this.loading = true;
        let articles = this.getArticles();
        this.page.form.map(t => {
          return t.questions;
        }).flat().forEach(q => {
          if (q.options.length != 0) {
            // @ts-ignore
            this.dealConfig.values[q.key as keyof Values] =
              q.controlType == 'checkbox' && !Array.isArray(this.dealConfig.values[q.key as keyof Values]) && this.dealConfig.values[q.key as keyof Values] != '' ?
                JSON.parse(this.dealConfig.values[q.key as keyof Values]) :
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
        if (articles.some(article => article.sku == 'SDH301') && articles.some(article => article.sku == 'SDH100')) {
          articles.forEach((v, i) => {
            if (v.sku == 'SDH301') {
              v.sku = 'SDH302'
            }
          })
        }
        articles.sort((a,b) => a.order - b.order || a.sku.localeCompare(b.sku));
        console.log(articles.map(a => a.sku))
        this.loading = false;
        // Create invoice
        this.hubService.createInvoice(this.dealConfig.values.deal_id, this.dealConfig.id, !result.isConfirmed, articles.map(a => a.sku)).subscribe(t => {
          Swal.fire({
            title: 'Gelukt!',
            html: `<a href="https://info.differentdoors.nl/configuratie-overview/deal/P${this.dealConfig.values.deal_id}/${this.dealConfig.path}" target="_blank">Bekijk hier de configuratie</a>`,
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
    });
  }

  getArticles(): Article[] {
    let articles = [...this.page.articles];
    // ODO
    if (this.page.type == FormsEnum.odo) {
      const maat = Math.ceil((((this.dealConfig.values.breedte < 2000 ? 2000 : this.dealConfig.values.breedte) - 2000) / 100) + 1) + (Math.ceil(((this.dealConfig.values.hoogte < 2000 ? 2000 : this.dealConfig.values.hoogte) - 2000) / 100) * 11)
      return [...articles, {sku:'ODO0' + ('0' + maat).slice(-2), order:20}, {sku:'ODO' + (maat + 99), order:20}];
    }

    //SDH
    if (this.page.type == FormsEnum.sdh) {
      for (var afm of Array.isArray(this.dealConfig.values.deur_afmetingen) ? this.dealConfig.values.deur_afmetingen : JSON.parse(this.dealConfig.values.deur_afmetingen)) {
        let maat = (Math.ceil(afm.breedte / 500) * 500 - 2500) / 500 * 2 + 1;
        maat = maat < 1 ? 1 : maat;
        if (afm.hoogte > 2500) {
          maat++;
        }
        if (this.form.controls['type_sectionaaldeur'].value != 'Zijwaartse sectionaaldeur') {
          articles.push({sku:'SDH' + (maat + 100), order:100})
          articles.push({sku:'SDH0' + ('0' + maat).slice(-2), order:100});
        } else {
          articles.push({sku:'ZDH0' + ('0' + maat).slice(-2), order:100});
        }
      }
    }
    return articles;
  }

  calculateDuration(): number {
    let duration = this.page.duration;
    this.page.form.map(t => {
      return t.questions;
    }).flat().forEach(q => {
      if (q.options.length != 0) {
        if (Array.isArray(this.form.controls[q.key].value)) {
          this.form.controls[q.key].value.forEach((v: string) => {
            const option = q.options.find(o => {
              return o.value == v
            });
            if (option?.duration !== undefined) {
              duration = duration + option.duration;
            }
          })
        } else {
          const option = q.options.find(o => {
            return o.value == this.form.controls[q.key].value
          });
          if (option?.duration !== undefined) {
            duration = duration + option.duration;
          }
        }
      }
    });
    if (this.dealConfig.values.extra_duration !== '' && this.dealConfig.values.extra_duration !== undefined) {
      duration = duration + parseInt(this.dealConfig.values.extra_duration);
    }
    return duration;
  }

  updateDuration() {
    this.durationSubject.next(this.calculateDuration());
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  public next() {
    window.scroll(0, 0);
    this.tabIndex = (this.tabIndex + 1) % this.tabCount;
  }

  public prev() {
    window.scroll(0, 0);
    this.tabIndex = (this.tabIndex - 1) % this.tabCount;
  }

  public emptyNonVisibleFields() {
    const visible: string[] = [];
    const nonVisible: string[] = [];

    this.page.form.flatMap(t => t.questions).forEach(q => {
      const isDependent = this.isDependent(q);
      (q.controlType === 'text' || q.controlType === 'table' ? q.fields : [q]).forEach(f => (isDependent ? visible : nonVisible).push(f.key));
    });

    const removeFields = nonVisible.filter(el => !visible.includes(el));
    this.dealConfig.values = new Values(this.form.getRawValue());
    for (const [k, v] of Object.entries(this.dealConfig.values)) if (Array.isArray(v)) { // @ts-ignore
      this.dealConfig.values[k] = JSON.stringify(v);
    }
    removeFields.forEach(field => {
      if (this.dealConfig.values[field as keyof Values]) { // @ts-ignore
        this.dealConfig.values[field] = '';
      }
    });
    this.setEmptyImages();
    console.log(this.dealConfig);
    this.hubService.updateDealConfig(this.dealConfig.values.deal_id, this.dealConfig.id, this.dealConfig).subscribe(() => {
      this.publish()
    });
  }

  private isDependent(q: FlatArray<QuestionBase<string>[][], 1>): boolean {
    for (const dep of q.dependent) {
      const fieldValue = this.form.controls[dep.field].value;
      if (Array.isArray(fieldValue) ? !fieldValue.some(element => dep.values.includes(element)) : !dep.values.includes(fieldValue))
        return false;
    }
    return true;
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
      if (this.dealConfig.values[q.key as keyof Values] !== undefined) {
        // @ts-ignore
        this.dealConfig.values[q.key] = this.dealConfig.values[q.key as keyof Values] != '' ? JSON.parse(this.dealConfig.values[q.key as keyof Values]) : [];
      }
    })
  }

  private setEmptyImages() {
    let questions: any[] = [];
    this.page.form.forEach(element => {
      questions.push(...element.questions.filter(q => q.controlType == 'upload'));
    });
    questions.forEach(q => {
      // @ts-ignore
      this.dealConfig.values[q.key] = this.dealConfig.values[q.key as keyof Values]?.url ? this.dealConfig.values[q.key as keyof Values] : {
        url: '',
        type: 'image'
      };
    })
  }

  getFormPage(type: string | undefined) {
    return Object.values(forms).filter(k => {
      return k.type == type;
    })[0]
  }

  publish() {
    this.publishing = true;
    // Add montage duration
    const duration = this.calculateDuration();
    if (duration != 0) {
      this.hubService.updateDeal(this.dealConfig.values.deal_id, {properties: {montage_duration: duration}}).subscribe();
    }
    this.hubService.publishDealConfig(this.dealConfig.values.deal_id, this.dealConfig.id).subscribe(() => this.publishing = false, error1 => this.publishing = false);
  }
}

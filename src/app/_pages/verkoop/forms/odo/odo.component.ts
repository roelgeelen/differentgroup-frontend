import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {QuestionControlService} from "../dynamic-form/question-control.service";
import {TabBase} from "../dynamic-form/model/tab-base";
import {tabs} from "./odo";
import {DealConfig} from "../../../../_models/hubspot/DealConfig";
import {Values} from "../../../../_models/hubspot/Values";
import {HubspotService} from "../../../../_services/hubspot.service";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {User} from "../../../../_models/User";


@Component({
  selector: 'app-odo',
  templateUrl: './odo.component.html',
  styleUrls: ['./odo.component.scss'],
  providers: [QuestionControlService]
})
export class OdoComponent implements OnInit {
  tabs: TabBase[] = tabs;
  currentUser: User;
  dealConfig: DealConfig;
  fullscreen = false;
  form!: FormGroup;
  error: string = '';
  tabIndex = 0;
  tabCount = 9;

  constructor(private qcs: QuestionControlService, private hubService: HubspotService, private authService: AuthenticationService) {
    this.dealConfig = new DealConfig()
    this.dealConfig.values = new Values();
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x
    });
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.tabs);
  }

  findDeal() {
    if (this.dealConfig.values.deal_id != null) {
      this.hubService.getDeal(this.dealConfig.values.deal_id).subscribe(deal => {
        this.dealConfig = deal;
        this.dealConfig.values.adviseur = this.currentUser.name;
        this.setCustomValues();
        this.setStringToArrays();
        for (const key in this.dealConfig.values) {
          if (this.dealConfig.values[key as keyof Values] === null || this.dealConfig.values[key as  keyof Values].length == 0 ) {
            // @ts-ignore
            this.dealConfig.values[key] = this.form.get(key)?.value;
          }
        }
        this.form.setValue(this.dealConfig.values);
      }, error => {
        this.error = 'Kon deal niet vinden.';
      });
    } else {
      this.error = 'Vul eerst deal nummer in!';
    }
  }

  clear() {
    this.dealConfig.values = new Values();
  }

  onSubmit() {

  }

  submit() {
    this.hubService.createInvoice(new Values(this.form.getRawValue()), this.dealConfig.values.deal_id).subscribe();
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
    this.tabs.forEach(element => {
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
    this.tabs.forEach(element => {
      questions.push(...element.questions.filter(q => q.controlType == 'checkbox'));
    });
    questions.forEach(q => {
      // @ts-ignore
      this.dealConfig.values[q.key] = this.dealConfig.values[q.key as keyof Values] != null ? this.dealConfig.values[q.key as keyof Values].split(',') : [];
    })
  }
}

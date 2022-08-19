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
import {FormPage} from "../dynamic-form/model/formPage";
import {FormsEnum} from "../dynamic-form/model/formsEnum";
import {forms} from "../dynamic-form/forms";


@Component({
  selector: 'app-form',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [QuestionControlService]
})
export class OverviewComponent implements OnInit {
  page: FormPage;
  currentUser: User;
  dealConfig: DealConfig;
  configurations: DealConfig[];
  fullscreen = false;
  form!: FormGroup;
  error: string = '';
  loading = false;
  forms() : Array<string> {
    return Object.keys(forms);
  }


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
    //this.getFormType();
    this.route.paramMap.subscribe(queryParams => {
      this.dealConfig = new DealConfig()
      this.dealConfig.values = new Values();
      this.route.queryParams.subscribe(params => {
        if (params['deal']) {
          this.dealConfig.values.deal_id = params['deal'];
          this.findDeal();
        }
      })
    });
  }

  findDeal() {
    this.configurations = [];
    if (this.dealConfig.values.deal_id != null) {
      this.loading = true;
      this.hubService.getDeal(this.dealConfig.values.deal_id).subscribe(deal => {
        this.dealConfig = deal;
        this.dealConfig.values.configuraties.forEach(c => {
          this.hubService.getConfig(c.id).subscribe(r => {
            this.configurations.push(r);
          })
        })
        this.loading = false;
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

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  getForm(formEnum: string): FormPage {
    return forms[formEnum as FormsEnum]
  }

  getFormType(title: string|undefined) {
    return Object.values(forms).filter(k => {
      return k.title == title;
    })[0].type
  }

  delete() {
    Swal.fire({
      title: 'Weet je het zeker?',
      text: 'Wil je deze configuratie echt verwijderen?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, verwijderen!',
      cancelButtonText: 'Annuleren',
    }).then((result) => {
      if (result.value) {
        //this.notificationsService.create(null, 'Not implemented yet.', NotificationType.Success, this.temp);
      }
    });
  }
}

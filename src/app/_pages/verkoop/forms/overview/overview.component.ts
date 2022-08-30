import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
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
import {Location} from '@angular/common';


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
  new_form: string;
  selectForms: { name: string, items: string[] }[] = [
    {
      name: 'Onderhoudsarm',
      items: ['odo']
    },
    {
      name: 'Hout',
      items: ['sdh', 'odhd', 'vdh', 'ldh']
    }
  ]

  constructor(
    private qcs: QuestionControlService,
    private hubService: HubspotService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(queryParams => {
      this.dealConfig = new DealConfig()
      this.dealConfig.values = new Values();
      if (queryParams.get('dealId') !== null) {
        // @ts-ignore
        this.dealConfig.values.deal_id = +queryParams.get('dealId');
        this.findDeal();
      }
    });
  }

  findDeal() {
    this.error = '';
    this.configurations = [];
    if (this.dealConfig.values.deal_id != null) {
      this.loading = true;
      this.hubService.getDeal(this.dealConfig.values.deal_id).subscribe(deal => {
        this.dealConfig = deal;
        this.location.replaceState('/verkoop/formulier/' + this.dealConfig.values.deal_id);
        if (Array.isArray(this.dealConfig.values.configuraties)) {
          this.dealConfig.values.configuraties.forEach(c => {
            this.hubService.getConfig(this.dealConfig.values.deal_id, c.id).subscribe(r => {
              this.configurations.push(r);
            })
          })
        }

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
    this.location.replaceState('/verkoop/formulier');
    this.dealConfig = new DealConfig();
    this.dealConfig.values = new Values();
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  getForm(formEnum: string): FormPage {
    return forms[formEnum as FormsEnum]
  }

  delete(configId: number) {
    Swal.fire({
      title: 'Weet je het zeker?',
      text: 'Wil je deze configuratie permanent verwijderen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e3785',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, verwijderen!',
      cancelButtonText: 'Annuleren',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.hubService.deleteDealConfig(this.dealConfig.values.deal_id, configId).subscribe(r => {
          this.findDeal();
        })
      }
    });
  }

  addForm(new_form: string) {
    this.loading = true;
    this.error = '';
    if (new_form == null) {
      this.error = 'Kies eerst een formulier';
      return;
    }
    let newConfig = new DealConfig();
    newConfig.name = this.dealConfig.name;
    let values = new Values();
    values.title = forms[new_form as FormsEnum].title;
    values.deal_id = this.dealConfig.values.deal_id;
    values.dealname = this.dealConfig.name;
    newConfig.values = values;

    // @ts-ignore
    this.hubService.createDealConfig(this.dealConfig.values.deal_id, newConfig).subscribe((r: DealConfig) => {
      this.loading = false;
      location.replace("/verkoop/formulier/" + this.dealConfig.values.deal_id + "/" + r.id)
    })

  }
}

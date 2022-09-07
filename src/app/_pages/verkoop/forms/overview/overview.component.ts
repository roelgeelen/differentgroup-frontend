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
      this.hubService.getDealConfigs(this.dealConfig.values.deal_id).subscribe(dealConf => {
        this.dealConfig = dealConf;
        this.location.replaceState('/verkoop/formulier/' + this.dealConfig.values.deal_id);
        if (Array.isArray(this.dealConfig.values.configuraties)) {
          this.dealConfig.values.configuraties.forEach(c => {
            this.hubService.getConfig(this.dealConfig.values.deal_id, c.id).subscribe(r => {
              this.configurations.push(r);
            })
          })
        }
        this.hubService.getDeal(this.dealConfig.values.deal_id).subscribe(deal => {
          if (
            !deal.properties.beide_personen_aanwezig_bij_gesprek_ ||
            !deal.properties.type_woning ||
            !deal.properties.dagdeel_bezoek ||
            !deal.properties.wanneer_gaat_het_project_spelen_
          ) {
            this.openDealQuestions();
          }
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
      this.loading = false;
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

  openDealQuestions() {
    Swal.fire({
      title: 'Sales vragen',
      html:
        '<label for="type_woning">Type woning</label>' +
        '<select id="type_woning" class="swal2-input">' +
        '  <option>Selecteer een optie</option>' +
        '  <option value="Villa">Villa</option>' +
        '  <option value="Vrijstaande woning">Vrijstaande woning</option>' +
        '  <option value="Twee onder een kap">2-onder-1 kap</option>' +
        '  <option value="Geschakelde woning">Geschakelde woning</option>' +
        '  <option value="Rijtjeswoning">Rijtjeswoning</option>' +
        '</select>' +
        '<label for="beide_personen_aanwezig_bij_gesprek_">Beide personen aanwezig</label>' +
        '<select id="beide_personen_aanwezig_bij_gesprek_" class="swal2-input">' +
        '  <option>Selecteer een optie</option>' +
        '  <option value="Ja">Ja</option>' +
        '  <option value="Nee">Nee</option>' +
        '  <option value="Alleenstaand">Alleenstaand</option>' +
        '</select>' +
        '<label for="wanneer_gaat_het_project_spelen_">Wanneer gaat het project spelen</label>' +
        '<select id="wanneer_gaat_het_project_spelen_" class="swal2-input">' +
        '  <option>Selecteer een optie</option>' +
        '  <option value="Binnen 3 maanden">Binnen 3 maanden</option>' +
        '  <option value="3 tot 6 maanden">3 tot 6 maanden</option>' +
        '  <option value="Langer dan 6 maanden">Langer dan 6 maanden</option>' +
        '</select>' +
        '<label for="dagdeel_bezoek">Dagdeel bezoek</label>' +
        '<select id="dagdeel_bezoek" class="swal2-input">' +
        '  <option>Selecteer een optie</option>' +
        '  <option value="Ochtend">Ochtend</option>' +
        '  <option value="Middag">Middag</option>' +
        '  <option value="Avond">Avond</option>' +
        '</select>',
      focusConfirm: false,
      confirmButtonText: 'Opslaan',
      confirmButtonColor: '#2e3785',
      showCancelButton: true,
      cancelButtonText: 'Later invullen',
      preConfirm: () => {
        let preForm: {type_woning: string, beide_personen_aanwezig_bij_gesprek_: string, wanneer_gaat_het_project_spelen_: string, dagdeel_bezoek: string} =
          {
            type_woning: (document.getElementById('type_woning') as HTMLInputElement).value,
            beide_personen_aanwezig_bij_gesprek_: (document.getElementById('beide_personen_aanwezig_bij_gesprek_') as HTMLInputElement).value,
            wanneer_gaat_het_project_spelen_: (document.getElementById('wanneer_gaat_het_project_spelen_') as HTMLInputElement).value,
            dagdeel_bezoek: (document.getElementById('dagdeel_bezoek') as HTMLInputElement).value
          };
        this.hubService.updateDeal(this.dealConfig.values.deal_id, {properties: preForm}).subscribe();
      }
    })
  }
}

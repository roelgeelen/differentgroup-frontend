import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {QuestionControlService} from "../dynamic-form/question-control.service";
import {DealConfig} from "../../../../_models/hubspot/DealConfig";
import {Values} from "../../../../_models/hubspot/Values";
import {HubspotService} from "../../../../_services/hubspot.service";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {User} from "../../../../_models/User";
import Swal from 'sweetalert2'
import {ActivatedRoute, Router} from "@angular/router";
import {FormPage} from "../dynamic-form/model/formPage";
import {FormsEnum} from "../dynamic-form/model/formsEnum";
import {forms} from "../dynamic-form/forms";
import {Location} from '@angular/common';
import {EnumRoles} from "../../../../_models/enum/enumRoles";

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
  configurations: DealConfig[] = [];
  recentConfigs: DealConfig[] = [];
  searchRecent: string = "";
  fullscreen = false;
  form!: FormGroup;
  error: string = '';
  loading = false;
  loadingC = false;
  new_form: string;
  // selectForms: { name: string, items: string[] }[] = [
  //   {
  //     name: 'Onderhoudsarm',
  //     items: ['odo']
  //   },
  //   {
  //     name: 'Hout',
  //     items: ['sdh', 'odhd', 'odht', 'vdh', 'ldh', 'hpt']
  //   },
  //   {
  //     name: 'Overige',
  //     items: ['gevel', 'files']
  //   }
  // ]
  selectForms: { name: string, items: string[] }[] = [
    {
      name: 'Overige',
      items: ['files']
    }
  ]

  constructor(
    private qcs: QuestionControlService,
    private hubService: HubspotService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
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
      if (queryParams.get('dealId') !== null) {
        // @ts-ignore
        this.dealConfig.values.deal_id = +queryParams.get('dealId');
        this.findDeal();
      } else {
        this.findRecent();
      }
    });
  }

  get isADMIN() {
    return this.currentUser && this.currentUser.roles.indexOf(EnumRoles.FORMULIEREN_KLANT) !== -1;
  }

  findRecent() {
    this.recentConfigs = [];
    this.loadingC = true;
    this.hubService.getRecentConfigs(this.currentUser.name, this.searchRecent).subscribe(c => {
      this.recentConfigs = c;
      this.loadingC = false;
    }, error1 => {
      this.loadingC = false;
    });
  }

  openRecent(dealId: number) {
    this.dealConfig.values.deal_id = dealId;
    this.findDeal();
  }

  findDeal() {
    this.error = '';
    this.configurations = [];
    if (this.dealConfig.values.deal_id != null) {
      this.loading = true;
      this.hubService.getDealConfigs(this.dealConfig.values.deal_id).subscribe(dealConf => {
        this.dealConfig = dealConf;
        this.location.replaceState('/verkoop/formulier/' + this.dealConfig.values.deal_id);
        this.loadingC = true;
        this.hubService.getConfigs(this.dealConfig.values.deal_id).subscribe(c => {
          this.loadingC = false;
          this.configurations = c;
          console.log(this.configurations)
        }, error1 => {
          this.loadingC = false;
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
    this.findRecent();
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
        }, error1 => {
          this.loading = false;
          this.error = 'Er is iets fout gegaan bij het verwijderen';
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
    values.type = forms[new_form as FormsEnum].type;
    values.deal_id = this.dealConfig.values.deal_id;
    values.dealname = this.dealConfig.name;
    newConfig.values = values;

    // @ts-ignore
    this.hubService.createDealConfig(this.dealConfig.values.deal_id, newConfig).subscribe((r: DealConfig) => {
        this.loading = false;
        this.router.navigate(['/verkoop/formulier/' + this.dealConfig.values.deal_id + '/' + r.id]);
        // location.replace("/verkoop/formulier/" + this.dealConfig.values.deal_id + "/" + r.id)
      },
      error1 => {
        this.loading = false;
        this.error = 'Er is iets fout gegaan bij het aanmaken';
      })
  }

  duplicateForm(config: DealConfig) {
    Swal.fire({
      title: 'Formulier dupliceren',
      input: 'text',
      inputValue: config.values.title + ' copy',
      showCancelButton: true,
      confirmButtonText: 'Dupliceren',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Annuleren',
      confirmButtonColor: '#2e3785',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.hubService.getConfig(config.values.deal_id, config.id).subscribe(fullConfig => {
          fullConfig.values.title = result.value;
          // @ts-ignore
          this.hubService.createDealConfig(this.dealConfig.values.deal_id, fullConfig).subscribe((r: DealConfig) => {
              this.loading = false;
              this.router.navigate(['/verkoop/formulier/' + this.dealConfig.values.deal_id + '/' + r.id]);
              // location.replace("/verkoop/formulier/" + this.dealConfig.values.deal_id + "/" + r.id)
            },
            error1 => {
              this.loading = false;
              this.error = 'Er is iets fout gegaan bij het aanmaken';
            })
        })
      }
    })
  }
}

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
  fullscreen = false;
  form!: FormGroup;
  error: string = '';
  loading = false;
  tabIndex = 0;
  tabCount: number;
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
    if (this.dealConfig.values.deal_id != null) {
      this.loading = true;
      this.hubService.getDeal(this.dealConfig.values.deal_id).subscribe(deal => {
        this.dealConfig = deal;
        this.dealConfig.values.adviseur = this.currentUser.name;
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

}

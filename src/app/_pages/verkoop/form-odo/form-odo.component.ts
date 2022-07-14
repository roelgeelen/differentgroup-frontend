import { Component, OnInit } from '@angular/core';
import {DealConfig} from "../../../_models/hubspot/DealConfig";
import {HubspotService} from "../../../_services/hubspot.service";
import {Values} from "../../../_models/hubspot/Values";

const cilinders: string[] = [
  "Cilinder leveren (incl. drie sleutels)",
  "Extra sleutel - ODO308",
  "Gelijksluitend (bij meedere deuren) - ODO307",
  "Draaiknopcilinder",
  "Aangeleverd door klant (cilindermaat 40/45 binnen/buitenzijde)"
]

@Component({
  selector: 'app-form-odo',
  templateUrl: './form-odo.component.html',
  styleUrls: ['./form-odo.component.scss']
})
export class FormOdoComponent implements OnInit {
  dealConfig: DealConfig;
  fullscreen = false;
  tabIndex = 0;
  tabCount = 9;
  error: string = '';

  private _verdelingSymetrisch: string;
  private _customVerdelingSymetrisch: string;

  private _kleuroptie: string;
  private _customKleuroptie: string;

  _bestaandeDeur: string[];
  _vloeraanpassing: string[];
  _indicatioMontageUren: string[];

  private _cilinder: string[];
  private _customCilinder: string;

  private _montage: string;
  private _customMontage: string;

  constructor(private hubService: HubspotService) {
    this.dealConfig = new DealConfig()
    this.dealConfig.values = new Values();
  }

  ngOnInit(): void {
  }

  findDeal() {
    if (this.dealConfig.values.deal_id != null) {
      this.hubService.getDeal(this.dealConfig.values.deal_id).subscribe(deal => {
        this.dealConfig = deal;
        if (this.dealConfig.values.verdeling_symmetrisch != null) {
          if (this.dealConfig.values.verdeling_symmetrisch != 'Ja') {
            this.customVerdelingSymetrisch = this.dealConfig.values.verdeling_symmetrisch;
            this.verdelingSymetrisch = 'other';
          } else {
            this.verdelingSymetrisch = 'Ja';
          }
        }
        if (this.dealConfig.values.kleuropties != null) {
          if (this.dealConfig.values.kleuropties != '9016 (standaard)') {
            this.customKleuroptie = this.dealConfig.values.kleuropties;
            this.kleuroptie = 'other';
          } else {
            this.kleuroptie = '9016 (standaard)';
          }
        }
        if (this.dealConfig.values.cilinder != null) {
          this.cilinder = this.dealConfig.values.cilinder.split(',');
          const cil = this.cilinder.filter(item => cilinders.indexOf(item) < 0);
          if (cil.length > 0) {
            this.customCilinder = cil[0];
            let index = this.dealConfig.values.cilinder.split(',').indexOf(this.customCilinder);
            this.cilinder.splice(index);
            this.cilinder.push('other');
          }
        }
        if (this.dealConfig.values.montage != null) {
          if (this.dealConfig.values.montage != 'Binnenzijde gelijk met binnenmuur') {
            this.customMontage = this.dealConfig.values.montage;
            this.montage = 'other';
          } else {
            this.montage = 'Binnenzijde gelijk met binnenmuur';
          }
        }
        if (this.dealConfig.values.bestaande_deur != null){
          this._bestaandeDeur = this.dealConfig.values.bestaande_deur.split(',');
        }
        if (this.dealConfig.values.vloeraanpassing != null){
          this._vloeraanpassing = this.dealConfig.values.vloeraanpassing.split(',');
        }
        if (this.dealConfig.values.indicatie_van_montage_uren != null){
          this._indicatioMontageUren = this.dealConfig.values.indicatie_van_montage_uren.split(',');
        }
      }, error => {
        this.error = 'Kon deal niet vinden.';
      });
    } else {
      this.error = 'Vul eerst deal nummer in!';
    }
  }

  updateDealConfig() {
      this.hubService.updateDealConfig(this.dealConfig, this.dealConfig.id).subscribe();
  }

  clear() {
    this.dealConfig.values = new Values();
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

  get verdelingSymetrisch(): string {
    return this._verdelingSymetrisch;
  }

  set verdelingSymetrisch(value: string) {
    this._verdelingSymetrisch = value;
    this.updateVerdelingSymetrisch();
  }

  get customVerdelingSymetrisch(): string {
    return this._customVerdelingSymetrisch;
  }

  set customVerdelingSymetrisch(value: string) {
    this._customVerdelingSymetrisch = value;
    this.updateVerdelingSymetrisch();
  }

  private updateVerdelingSymetrisch(): void {
    this.dealConfig.values.verdeling_symmetrisch = this._verdelingSymetrisch === "other" ? this._customVerdelingSymetrisch : this._verdelingSymetrisch;
    this.updateDealConfig();
  }


  get kleuroptie(): string {
    return this._kleuroptie;
  }

  set kleuroptie(value: string) {
    this._kleuroptie = value;
    this.updateKleuroptie()
  }

  get customKleuroptie(): string {
    return this._customKleuroptie;
  }

  set customKleuroptie(value: string) {
    this._customKleuroptie = value;
    this.updateKleuroptie()
  }

  private updateKleuroptie(): void {
    this.dealConfig.values.kleuropties = this._kleuroptie === "other" ? this._customKleuroptie : this._kleuroptie;
    this.updateDealConfig();
  }


  get cilinder(): string[] {
    return this._cilinder;
  }

  set cilinder(value: string[]) {
    this._cilinder = value;
  }

  get customCilinder(): string {
    return this._customCilinder;
  }

  set customCilinder(value: string) {
    this._customCilinder = value;
    this.updateCilinder()
  }

  updateCilinder(): void {
    this.dealConfig.values.cilinder = this.cilinder.toString().replace('other', this.customCilinder);
    this.updateDealConfig();
  }


  get montage(): string {
    return this._montage;
  }

  set montage(value: string) {
    this._montage = value;
    this.updateMonatge();
  }

  get customMontage(): string {
    return this._customMontage;
  }

  set customMontage(value: string) {
    this._customMontage = value;
    this.updateMonatge();
  }
  private updateMonatge(): void {
    this.dealConfig.values.montage = this._montage === "other" ? this._customMontage : this._montage;
    this.updateDealConfig();
  }

  updateBestaandeDeur() {
    this.dealConfig.values.bestaande_deur = this._bestaandeDeur.toString();
    this.updateDealConfig();
  }

  updateVloeraanpassing() {
    this.dealConfig.values.vloeraanpassing = this._vloeraanpassing.toString();
    this.updateDealConfig();
  }

  updateIndicatieMontageuren() {
    this.dealConfig.values.indicatie_van_montage_uren = this._indicatioMontageUren.toString();
    this.updateDealConfig();
  }
}

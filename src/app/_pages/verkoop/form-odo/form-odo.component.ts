import { Component, OnInit } from '@angular/core';
import {Deal} from "../../../_models/hubspot/Deal";
import {HubspotService} from "../../../_services/hubspot.service";
import {Properties} from "../../../_models/hubspot/Properties";
import {DealV1} from "../../../_models/hubspot/v1/DealV1";

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
  dealConfig: Deal;
  fullscreen = false;
  tabIndex = 0;
  tabCount = 8;
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
    this.dealConfig = new Deal()
    this.dealConfig.properties = new Properties();
  }

  ngOnInit(): void {
  }

  findDeal() {
    if (this.dealConfig.id != null) {
      this.hubService.getDeal(this.dealConfig.id).subscribe(deal => {
        this.dealConfig = deal;
        if (this.dealConfig.properties.verdeling_symmetrisch != null) {
          if (this.dealConfig.properties.verdeling_symmetrisch != 'Ja') {
            this.customVerdelingSymetrisch = this.dealConfig.properties.verdeling_symmetrisch;
            this.verdelingSymetrisch = 'other';
          } else {
            this.verdelingSymetrisch = 'Ja';
          }
        }
        if (this.dealConfig.properties.kleuropties != null) {
          if (this.dealConfig.properties.kleuropties != '9016 (standaard)') {
            this.customKleuroptie = this.dealConfig.properties.kleuropties;
            this.kleuroptie = 'other';
          } else {
            this.kleuroptie = '9016 (standaard)';
          }
        }
        if (this.dealConfig.properties.cilinder != null) {
          this.cilinder = this.dealConfig.properties.cilinder.split(';');
          const cil = this.cilinder.filter(item => cilinders.indexOf(item) < 0);
          if (cil.length > 0) {
            this.customCilinder = cil[0];
            let index = this.dealConfig.properties.cilinder.split(';').indexOf(this.customCilinder);
            this.cilinder.splice(index);
            this.cilinder.push('other');
          }
        }
        if (this.dealConfig.properties.montage != null) {
          if (this.dealConfig.properties.montage != 'Binnenzijde gelijk met binnenmuur') {
            this.customMontage = this.dealConfig.properties.montage;
            this.montage = 'other';
          } else {
            this.montage = 'Binnenzijde gelijk met binnenmuur';
          }
        }
        if (this.dealConfig.properties.bestaande_deur != null){
          this._bestaandeDeur = this.dealConfig.properties.bestaande_deur.split(';');
        }
        if (this.dealConfig.properties.vloeraanpassing != null){
          this._vloeraanpassing = this.dealConfig.properties.vloeraanpassing.split(';');
        }
        if (this.dealConfig.properties.indicatie_van_montage_uren != null){
          this._indicatioMontageUren = this.dealConfig.properties.indicatie_van_montage_uren.split(';');
        }
      }, error => {
        this.error = 'Kon deal niet vinden.';
      });
    } else {
      this.error = 'Vul eerst deal nummer in!';
    }
  }

  updateDealProp(name: string, $event: string) {
    if ($event != null && $event != '') {
      console.log($event);
      this.hubService.updateDealProp(new DealV1(name, $event), this.dealConfig.id).subscribe();
    }
  }

  clear() {
    this.dealConfig.properties = new Properties();
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
    this.dealConfig.properties.verdeling_symmetrisch = this._verdelingSymetrisch === "other" ? this._customVerdelingSymetrisch : this._verdelingSymetrisch;
    this.updateDealProp('verdeling_symmetrisch', this.dealConfig.properties.verdeling_symmetrisch);
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
    this.dealConfig.properties.kleuropties = this._kleuroptie === "other" ? this._customKleuroptie : this._kleuroptie;
    this.updateDealProp('kleuropties', this.dealConfig.properties.kleuropties);
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
    this.dealConfig.properties.cilinder = this.cilinder.toString().replace('other', this.customCilinder).replaceAll(',', ';');
    this.updateDealProp('cilinder', this.dealConfig.properties.cilinder);
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
    this.dealConfig.properties.montage = this._montage === "other" ? this._customMontage : this._montage;
    this.updateDealProp('montage', this.dealConfig.properties.montage);
  }

  updateBestaandeDeur() {
    this.dealConfig.properties.bestaande_deur = this._bestaandeDeur.toString().replaceAll(',', ';');
    this.updateDealProp('bestaande_deur', this.dealConfig.properties.bestaande_deur);
  }

  updateVloeraanpassing() {
    this.dealConfig.properties.vloeraanpassing = this._vloeraanpassing.toString().replaceAll(',', ';');
    this.updateDealProp('vloeraanpassing', this.dealConfig.properties.vloeraanpassing);
  }

  updateIndicatieMontageuren() {
    this.dealConfig.properties.indicatie_van_montage_uren = this._indicatioMontageUren.toString().replaceAll(',', ';');
    this.updateDealProp('indicatie_van_montage_uren', this.dealConfig.properties.indicatie_van_montage_uren);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DealConfig} from "../_models/hubspot/DealConfig";
import {Observable} from "rxjs";
import {Deal} from "../_models/hubspot/Deal";

@Injectable({
  providedIn: 'root'
})
export class HubspotService {

  constructor(private http: HttpClient) {
  }

  getDeal(dealId: number) {
    return this.http.get<Deal>(`${environment.apiUrlTest}/deals/${dealId}`);
  }

  updateDeal(dealId: number, deal: Object) {
    console.log(deal)
    return this.http.put(`${environment.apiUrlTest}/deals/${dealId}`, deal);
  }

  getDealConfigs(dealId: number) {
    return this.http.get<DealConfig>(`${environment.apiUrlTest}/configs/${dealId}`);
  }

  createDealConfig(dealId: number, deal: DealConfig) {
    return this.http.post(`${environment.apiUrlTest}/configs/${dealId}/forms/create`, deal);
  }

  getConfig(dealId: number, configId: number) {
    return this.http.get<DealConfig>(`${environment.apiUrlTest}/configs/${dealId}/forms/${configId}`);
  }

  updateDealConfig(dealId: number, configId: number, deal: DealConfig) {
    return this.http.put(`${environment.apiUrlTest}/configs/${dealId}/forms/${configId}`, deal);
  }

  deleteDealConfig(dealId: number, configId: number) {
    return this.http.delete(`${environment.apiUrlTest}/configs/${dealId}/forms/${configId}`);
  }

  createInvoice(dealId: number, configId: number, replace: boolean, values: string[]) {
    return this.http.put(`${environment.apiUrlTest}/configs/${dealId}/forms/${configId}/invoice?replace=${replace}`, values);
  }

  saveImage(dealId: number, configId: number, file: File, filename: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('filename', filename);
    const req = new HttpRequest('POST', `${environment.apiUrlTest}/configs/${dealId}/forms/${configId}/image/upload`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}

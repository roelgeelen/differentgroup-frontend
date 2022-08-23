import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DealConfig} from "../_models/hubspot/DealConfig";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HubspotService {

  constructor(private http: HttpClient) {
  }

  getDeal(dealId: number) {
    return this.http.get<DealConfig>(`${environment.apiUrlTest}/deals/${dealId}/configs`);
  }

  createDealConfig(dealId: number, deal: DealConfig) {
    return this.http.post(`${environment.apiUrlTest}/deals/${dealId}/configs/create`, deal);
  }

  getConfig(dealId: number, configId: number) {
    return this.http.get<DealConfig>(`${environment.apiUrlTest}/deals/${dealId}/configs/${configId}`);
  }

  updateDealConfig(dealId: number, configId: number, deal: DealConfig) {
    return this.http.post(`${environment.apiUrlTest}/deals/${dealId}/configs/${configId}/update`, deal);
  }

  createInvoice(dealId: number, configId: number, values: string[]) {
    return this.http.post(`${environment.apiUrlTest}/deals/${dealId}/configs/${configId}/invoice`, values);
  }

  saveImage(file: File, filename: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('filename', filename);
    const req = new HttpRequest('POST', `${environment.apiUrlTest}/upload/image`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}

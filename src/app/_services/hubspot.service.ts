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

  getDeal(id: number) {
    return this.http.get<DealConfig>(`${environment.apiUrlTest}/deals/${id}/menu`);
  }

  updateDealConfig(deal: DealConfig, id: number) {
    return this.http.post(`${environment.apiUrlTest}/deals/${id}/config/update`, deal);
  }

  createInvoice(values: string[], id: number) {
    return this.http.post(`${environment.apiUrlTest}/deals/${id}/invoice/create`, values);
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

  getConfig(id: number) {
    return this.http.get<DealConfig>(`${environment.apiUrlTest}/deals/config/${id}`);
  }
}

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
    return this.http.get<DealConfig>(`${environment.apiUrl}/deals/${id}/config`);
  }

  updateDealConfig(deal: DealConfig, id: number) {
    return this.http.post(`${environment.apiUrl}/deals/${id}/config/update`, deal);
  }

  createInvoice(values: string[], id: number) {
    return this.http.post(`${environment.apiUrl}/deals/${id}/invoice/create`, values);
  }

  saveImage(file: File, filename: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('filename', filename);
    const req = new HttpRequest('POST', `${environment.apiUrl}/upload/image`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}

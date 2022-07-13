import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Deal} from "../_models/hubspot/Deal";
import {DealV1} from "../_models/hubspot/v1/DealV1";

@Injectable({
  providedIn: 'root'
})
export class HubspotService {

  constructor(private http: HttpClient) {
  }

  getDeal(id: number) {
    return this.http.get<Deal>(`${environment.apiUrl}/deals/${id}`);
  }

  updateDealProp(deal: DealV1, id: number) {
    console.log(JSON.stringify(deal));
    return this.http.post(`${environment.apiUrl}/deals/${id}/update`, deal);
  }
}

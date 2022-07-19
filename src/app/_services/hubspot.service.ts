import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DealConfig} from "../_models/hubspot/DealConfig";

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
}

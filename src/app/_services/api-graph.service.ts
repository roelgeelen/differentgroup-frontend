import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiGraphService {

  constructor(private http: HttpClient) {
  }

  getProduction() {
    return this.http.get<any>(`${environment.apiUrl}/graphs/production`)
  }

  getProductionv2() {
    return this.http.get<any>(`${environment.apiUrl}/graphs/production/v2`)
  }

  getProduced() {
    return this.http.get<any>(`${environment.apiUrl}/graphs/produced`)
  }

  getOpen() {
    return this.http.get<any>(`${environment.apiUrl}/graphs/totals/open`)
  }

  getSchedule() {
    return this.http.get<any>(`${environment.apiUrl}/graphs/totals/schedule`)
  }

  getUB() {
    return this.http.get<any>(`${environment.apiUrl}/graphs/totals/ub`)
  }

  getMeasure() {
    return this.http.get<any>(`${environment.apiUrl}/graphs/table/measure`)
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) { }

  getProduction() {
    return this.http.get<any>(`${environment.apiUrl}/stats/graphData`)
  }

  getTotal() {
    return this.http.get<any>(`${environment.apiUrl}/stats/total`)
  }

  getInplan() {
    return this.http.get<any>(`${environment.apiUrl}/stats/inplannen`)
  }

  getUB() {
    return this.http.get<any>(`${environment.apiUrl}/stats/ub`)
  }

  getOrderStatus(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/order/status/${id}`)
  }
}

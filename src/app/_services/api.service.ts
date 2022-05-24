import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Appointment} from "../_models/appointment/Appointment";
import {Calendar} from "../_models/calendar/Calendar";
import {Event} from "../_models/calendar/Event";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  searchNearbyEvents(lat: number, lng: number, owner: string, distance: number) {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/search/appointments/nearby?lat=${lat}&lng=${lng}&owner=${owner}&radius=${distance}`);
  }

  getUserCalendars() {
    return this.http.get<Calendar[]>(`${environment.apiUrl}/user/calendars`);
  }

  getBirthdays() {
    return this.http.get<Event[]>(`${environment.apiUrl}/birthdays`);
  }

  getProfilePicture():Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrl}/profile/picture`, {observe: 'response', responseType: 'blob'});
  }

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

  getMagazijn() {
    return this.http.get<any>(`${environment.apiUrl}/stats/magazijn`)
  }
}

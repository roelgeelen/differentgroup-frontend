import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Appointment} from "../_models/appointment/Appointment";
import {Calendar} from "../_models/calendar/Calendar";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  searchNearbyEvents(lat: number, lng: number, owner: string) {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/search/appointments/nearby?lat=${lat}&lng=${lng}&owner=${owner}`);
  }

  getUserCalendars() {
    return this.http.get<Calendar[]>(`${environment.apiUrl}/user/calendars`);
  }

  getProfilePicture():Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrl}/profile/picture`, {observe: 'response', responseType: 'blob'});
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Appointment} from "../_models/appointment/Appointment";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {
  }

  getAll(lat: number, lng: number, owner: number) {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/search/appointments/nearby?lat=${lat}&lng=${lng}&owner=${owner}`);
  }


}

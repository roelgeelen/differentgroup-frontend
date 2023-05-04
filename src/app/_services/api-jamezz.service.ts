import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Appointment} from "../_models/appointment/Appointment";
import {Event} from "../_models/calendar/Event";
import {Observable} from "rxjs";
import {Post} from "../_models/pages/Post";
import {Vehicle} from "../_models/vehicle/Vehicle";

@Injectable({
  providedIn: 'root'
})
export class ApiJamezzService {

  constructor(private http: HttpClient) {
  }

  getListGroups() {
    return this.http.get('https://jamezz.app/request/products/listgroups', {withCredentials: true});
  }
}

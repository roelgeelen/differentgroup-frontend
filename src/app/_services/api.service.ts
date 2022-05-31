import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Appointment} from "../_models/appointment/Appointment";
import {Calendar} from "../_models/calendar/Calendar";
import {Event} from "../_models/calendar/Event";
import {Observable} from "rxjs";
import {Post} from "../_models/pages/Post";

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

  getProfilePicture(): Observable<HttpResponse<Blob>> {
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

  getPosts() {
    return this.http.get<any>(`${environment.apiUrl}/posts`)
  }

  savePost(post: Post, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('title', post.title);
    formdata.append('content', post.message);
    const req = new HttpRequest('POST', `${environment.apiUrl}/posts/create`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getPostPicture(uuid: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrl}/posts/image/${uuid}`, {observe: 'response', responseType: 'blob'});
  }

  deletePost(uuid: string): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('DELETE', `${environment.apiUrl}/posts/${uuid}/delete`, null, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getPost(uuid: string | null) {
    return this.http.get(`${environment.apiUrl}/posts/${uuid}`);
  }

  updatePost(post: Post, file: File){
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('title', post.title);
    formdata.append('content', post.message);
    const req = new HttpRequest('PUT', `${environment.apiUrl}/posts/${post.id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}

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

  getCalendar(owner: string, start: string, end: string) {
    return this.http.get<Appointment[]>(`${environment.apiUrlTest}/calendars/${owner}?start=${start}&end=${end}`);
  }

  getBirthdays() {
    return this.http.get<Event[]>(`${environment.apiUrlTest}/profile/birthdays`);
  }

  getProfilePicture(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrlTest}/profile/avatar`, {observe: 'response', responseType: 'blob'});
  }

  getProduction() {
    return this.http.get<any>(`${environment.apiUrlTest}/graphs/production`)
  }

  getGeproduceert() {
    return this.http.get<any>(`${environment.apiUrlTest}/graphs/produced`)
  }

  getTotal() {
    return this.http.get<any>(`${environment.apiUrlTest}/graphs/totals/open`)
  }

  getInplan() {
    return this.http.get<any>(`${environment.apiUrlTest}/graphs/totals/schedule`)
  }

  getUB() {
    return this.http.get<any>(`${environment.apiUrlTest}/graphs/totals/ub`)
  }

  getOrderStatus(status: number) {
    return this.http.get<any>(`${environment.apiUrlTest}/graphs/orders/${status}`)
  }

  getMagazijn() {
    return this.http.get<any>(`${environment.apiUrlTest}/graphs/stockroom`)
  }

  getPosts() {
    return this.http.get<any>(`${environment.apiUrlTest}/posts`)
  }

  savePost(post: Post, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('title', post.title);
    formdata.append('content', post.message);
    const req = new HttpRequest('POST', `${environment.apiUrlTest}/posts`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getPostPicture(uuid: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrlTest}/images/${uuid}`, {observe: 'response', responseType: 'blob'});
  }

  deletePost(uuid: string): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('DELETE', `${environment.apiUrlTest}/posts/${uuid}`, null, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getPost(uuid: string | null) {
    return this.http.get(`${environment.apiUrlTest}/posts/${uuid}`);
  }

  updatePost(post: Post, file: File){
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('title', post.title);
    formdata.append('content', post.message);
    const req = new HttpRequest('PUT', `${environment.apiUrlTest}/posts/${post.id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}

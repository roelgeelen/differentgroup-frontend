import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Appointment} from "../_models/appointment/Appointment";
import {Event} from "../_models/calendar/Event";
import {Observable} from "rxjs";
import {Post} from "../_models/pages/Post";
import {DealConfig} from "../_models/hubspot/DealConfig";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getCalendar(owner: string, start: string, end: string) {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/calendars/${owner}?start=${start}&end=${end}`);
  }

  getBirthdays() {
    return this.http.get<Event[]>(`${environment.apiUrl}/profile/birthdays`);
  }

  getProfilePicture(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrl}/profile/avatar`, {observe: 'response', responseType: 'blob'});
  }

  getPosts(page: number, size: number) {
    return this.http.get<any>(`${environment.apiUrl}/posts?page=${page}&size=${size}`)
  }

  savePost(post: Post, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('title', post.title);
    formdata.append('content', post.message);
    const req = new HttpRequest('POST', `${environment.apiUrl}/posts`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getPicture(uuid: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrl}/images/${uuid}`, {observe: 'response', responseType: 'blob'});
  }

  deletePost(uuid: string): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('DELETE', `${environment.apiUrl}/posts/${uuid}`, null, {
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

  postToWallOfShame(user: string) {
    return this.http.post(`https://prod-179.westeurope.logic.azure.com:443/workflows/a2639d37c50c44ab8f44958a676ee4ec/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cPoNFZZAMPZ5jB_3oF1jd7t4YcekIQ2Nlai76UL8aJU`, user);
  }
}

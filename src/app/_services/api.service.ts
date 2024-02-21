import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Appointment} from "../_models/appointment/Appointment";
import {Event} from "../_models/calendar/Event";
import {Observable} from "rxjs";
import {Post} from "../_models/pages/Post";
import {Vehicle} from "../_models/vehicle/Vehicle";
import {User} from "../_models/User";
import {GraphUser} from "../_models/hrm/GraphUser";
import {FirestoreUser} from "../_models/hrm/FirestoreUser";
import {FirestoreConversation} from "../_models/hrm/FirestoreConversation";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getCalendar(owner: string, start: string, end: string) {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/calendars/${owner}?start=${start}&end=${end}`);
  }

  getTracking(organisation: string) {
    return this.http.get<Vehicle[]>(`${environment.apiUrl}/tracking/vehicles?organisation=${organisation}`);
  }

  getBirthdays() {
    return this.http.get<Event[]>(`${environment.apiUrl}/profile/events?size=6`);
  }

  getProfilePicture(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrl}/profile/avatar`, {observe: 'response', responseType: 'blob'});
  }

  getPosts(page: number, size: number, unPublished: boolean = false) {
    return this.http.get<any>(`${environment.apiUrl}/posts?page=${page}&size=${size}&unPublished=${unPublished}`)
  }

  savePost(post: Post, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('title', post.title);
    formdata.append('content', post.message);
    // @ts-ignore
    formdata.append('published', post.published);
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

  updatePost(post: Post, file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('title', post.title);
    formdata.append('content', post.message);
    // @ts-ignore
    formdata.append('published', post.published);
    const req = new HttpRequest('PUT', `${environment.apiUrl}/posts/${post.id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  postToWallOfShame(user: string, email: string) {
    return this.http.post(`https://prod-179.westeurope.logic.azure.com:443/workflows/a2639d37c50c44ab8f44958a676ee4ec/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cPoNFZZAMPZ5jB_3oF1jd7t4YcekIQ2Nlai76UL8aJU`, {
      user,
      email
    });
  }

  postShareConversation(email: string, user: string, conversation: FirestoreConversation) {
    return this.http.post(`https://prod-36.westeurope.logic.azure.com:443/workflows/1c6a24c2d0c04918b5ad360450dd6a97/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mDm50_Jtkaw_8pOiPwqqh7E5qlpQ0OAbEaXmNC4-gOM`, {
      conversation,
      email,
      user
    });
  }

  postFirebaseNotification(title: string, message: string, topicId: string, screen: string | null = null, users: string[] = []) {
    return this.http.post(`${environment.apiUrl}/firebase/notification`, {title, message, topicId, screen, users});
  }

  getDirectReports() {
    return this.http.get<GraphUser[]>(`${environment.apiUrl}/hrm/direct`);
  }

  getSharedUsers() {
    return this.http.get<FirestoreUser[]>(`${environment.apiUrl}/hrm/shared`);
  }

  updateSharedUsers(id: string, emails: string[]) {
    return this.http.put(`${environment.apiUrl}/hrm/users/${id}/share`, emails);
  }

  getUser(id: string) {
    return this.http.get<FirestoreUser>(`${environment.apiUrl}/hrm/users/${id}`);
  }

  getUserConversations(userId: string, year: number = 0) {
    return this.http.get<FirestoreConversation[]>(`${environment.apiUrl}/hrm/users/${userId}/conversations?year=${year}`);
  }

  getUserOpenConversations(userId: string) {
    return this.http.get<FirestoreConversation[]>(`${environment.apiUrl}/hrm/users/${userId}/open-conversations`);
  }

  getUserConversation(userId: string, id: string) {
    return this.http.get<FirestoreConversation>(`${environment.apiUrl}/hrm/users/${userId}/conversations/${id}`);
  }

  updateUserConversation(userId: string, id: string, conversation: FirestoreConversation) {
    return this.http.put(`${environment.apiUrl}/hrm/users/${userId}/conversations/${id}`, conversation);
  }

  createUserConversation(userId: string, conversation: FirestoreConversation) {
    return this.http.post<FirestoreConversation>(`${environment.apiUrl}/hrm/users/${userId}/conversations`, conversation);
  }

  deleteUserConversation(userId: string, id: string) {
    return this.http.delete(`${environment.apiUrl}/hrm/users/${userId}/conversations/${id}`);
  }
}

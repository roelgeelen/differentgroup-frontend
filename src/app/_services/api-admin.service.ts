import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {

  constructor(private http: HttpClient) {
  }

  getRoles() {
    return this.http.get<any>(`${environment.apiUrl}/admin/roles`)
  }

  getAssignedRoles() {
    return this.http.get<any>(`${environment.apiUrl}/admin/roles/users`)
  }

  getAssignedRolesByUser(id: string | null) {
    return this.http.get<any>(`${environment.apiUrl}/admin/roles/users/${id}`)
  }
  postAssignRole(id: string | null, role: any) {
    return this.http.post(`${environment.apiUrl}/admin/roles/users/${id}`, role);
  }

  deleteAssignedRole(id: string | null, roleId: string) {
    return this.http.delete(`${environment.apiUrl}/admin/roles/users/${id}/${roleId}`)
  }
}

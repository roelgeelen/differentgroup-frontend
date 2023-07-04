import {Component, OnInit} from '@angular/core';
import {ApiAdminService} from "../../../_services/api-admin.service";
import {UserRoles} from "../../../_models/admin/UserRoles";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  loading = false;
  users: UserRoles[] = [];
  constructor(private apiService: ApiAdminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getAssignedRoles().subscribe(u => {
      this.users = u;
      this.users.sort((a,b) => a.name.localeCompare(b.name));
      this.loading = false;
    })
  }

}

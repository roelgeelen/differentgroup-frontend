import {Component, OnInit} from '@angular/core';
import {ApiAdminService} from "../../../../_services/api-admin.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ActivatedRoute} from "@angular/router";
import {UserRoles} from "../../../../_models/admin/UserRoles";
import {AssignedRole} from "../../../../_models/admin/AssignedRole";

@Component({
  selector: 'app-edit',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  loading = false;
  roles: AssignedRole[] = [];
  user: UserRoles = new UserRoles();
  pathId: string | null;

  constructor(private apiService: ApiAdminService, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(queryParams => {
      if (queryParams.get('id') !== null) {
        this.pathId = queryParams.get('id');
        this.refreshRoles();
      }
    });
  }

  refreshRoles() {
    this.loading = true;
    this.apiService.getAssignedRolesByUser(this.pathId).subscribe(u => {
      this.user = u[0]
      this.user.roles.sort((a,b) => a.displayName.localeCompare(b.displayName))
      console.log(this.user)
      this.apiService.getRoles().subscribe(u => {
        this.roles = u;
        this.roles = this.roles.filter(role => this.user.roles.filter(r => r.id === role.id).length == 0)
        this.roles.sort((a,b) => a.displayName.localeCompare(b.displayName))
        this.loading = false;
      })
    });
  }

  onDrop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      this.loading = true;
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
      let object = event.container.data[event.currentIndex];
      if (event.container.id === 'user-roles-list') {
        this.apiService.postAssignRole(this.user.id, object).subscribe(() => this.refreshRoles(), error => this.loading = false);
      } else {
        this.apiService.deleteAssignedRole(this.user.id, object.assignedId).subscribe(() =>
          this.refreshRoles(), error => this.loading=false
        );

      }
    }
  }
}

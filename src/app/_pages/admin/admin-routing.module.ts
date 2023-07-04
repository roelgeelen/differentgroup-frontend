import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PostsComponent} from "./posts/posts.component";
import {PostComponent} from "./posts/post/post.component";
import {RolesComponent} from "./roles/roles.component";
import {EditRoleComponent} from "./roles/edit/edit-role.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'nieuws',
        component: PostsComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.BERICHTEN_BEHEREN,
          ]
        },
      },
      {
        path: 'nieuws/create',
        component: PostComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.BERICHTEN_BEHEREN,
          ]
        },
      },
      {
        path: 'nieuws/:id/update',
        component: PostComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.BERICHTEN_BEHEREN,
          ]
        },
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ROLLEN_BEHEREN,
          ],
        },
      },
      {
        path: 'roles/:id',
        component: EditRoleComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ROLLEN_BEHEREN,
          ]
        },
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule {
}

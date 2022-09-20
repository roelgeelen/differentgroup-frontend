import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../../_helpers/guards/auth.guard";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PostsComponent} from "./posts/posts.component";
import {PostComponent} from "./posts/post/post.component";

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
            EnumRoles.ADMIN,
            EnumRoles.ICT
          ]
        },
      },
      {
        path: 'nieuws/create',
        component: PostComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ADMIN,
            EnumRoles.ICT
          ]
        },
      },
      {
        path: 'nieuws/:id/update',
        component: PostComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ADMIN,
            EnumRoles.ICT
          ]
        },
      }
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

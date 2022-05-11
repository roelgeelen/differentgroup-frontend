import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VerkoopComponent} from "./verkoop.component";
import {AfsprakenComponent} from "./afspraken/afspraken.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {InmetenComponent} from "./inmeten/inmeten.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EnumRoles} from "../../_models/enum/enumRoles";

const routes: Routes = [
  {
    path: '',
    component: VerkoopComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'afspraken',
        component: AfsprakenComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.OFFICE,
          ]
        },
      },
      {
        path: 'inmeten',
        component: InmetenComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.OFFICE,
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

export class VerkoopRoutingModule {
}

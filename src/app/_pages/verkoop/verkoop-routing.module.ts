import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VerkoopComponent} from "./verkoop.component";
import {AfsprakenComponent} from "./afspraken/afspraken.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {InmetenComponent} from "./inmeten/inmeten.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {EnumRouteGuard} from "../../_helpers/enum.route.guard";
import {FormComponent} from "./forms/form/form.component";

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
            EnumRoles.ICT,
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
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
            EnumRoles.ICT,
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
          ]
        },
      },
      {
        path: 'formulier',
        component: FormComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.OFFICE,
            EnumRoles.ICT,
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
          ]
        },
      },
      {
        path: 'formulier/:form',
        component: FormComponent,
        canActivate: [AuthGuard, EnumRouteGuard],
        data: {
          roles: [
            EnumRoles.OFFICE,
            EnumRoles.ICT,
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
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

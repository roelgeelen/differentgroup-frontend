import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VerkoopComponent} from "./verkoop.component";
import {AfsprakenComponent} from "./afspraken/afspraken.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {InmetenComponent} from "./inmeten/inmeten.component";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {FormComponent} from "./forms/form/form.component";
import {OverviewComponent} from "./forms/overview/overview.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: VerkoopComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.INMETEN,
          ]
        },
      },
      {
        path: 'afspraken',
        component: AfsprakenComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.AFSPRAKEN,
          ]
        },
      },
      {
        path: 'inmeten',
        component: InmetenComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.INMETEN,
          ]
        },
      },
      {
        path: 'formulier',
        component: OverviewComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.FORMULIEREN,
            EnumRoles.FORMULIEREN_KLANT,
          ]
        },
      },
      {
        path: 'formulier/:dealId',
        component: OverviewComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.FORMULIEREN,
            EnumRoles.FORMULIEREN_KLANT,
          ]
        },
      },
      {
        path: 'formulier/:dealId/:configId',
        component: FormComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.FORMULIEREN,
            EnumRoles.FORMULIEREN_KLANT,
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

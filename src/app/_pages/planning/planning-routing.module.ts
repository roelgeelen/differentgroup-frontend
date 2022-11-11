import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlanningComponent} from "./planning.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LogisticComponent} from "./logistic/logistic.component";
import {ProductionComponent} from "./production/production.component";
import {VoorraadComponent} from "../magazijn/voorraad/voorraad.component";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {GeproduceerdComponent} from "./geproduceert/geproduceerd.component";

const routes: Routes = [
  {
    path: '',
    component: PlanningComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'logistiek',
        component: LogisticComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
            EnumRoles.PLANNING,
            EnumRoles.ICT
          ]
        },
      },
      {
        path: 'productie',
        component: ProductionComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
            EnumRoles.PRODUCTION,
            EnumRoles.PLANNING,
            EnumRoles.ICT
          ]
        },
      },
      {
        path: 'voorraad',
        component: VoorraadComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
            EnumRoles.PLANNING,
            EnumRoles.ICT
          ]
        },
      },
      {
        path: 'geproduceerd',
        component: GeproduceerdComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
            EnumRoles.PLANNING,
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

export class PlanningRoutingModule {
}

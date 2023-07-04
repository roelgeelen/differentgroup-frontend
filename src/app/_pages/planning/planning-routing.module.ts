import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlanningComponent} from "./planning.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductionComponent} from "./production/production.component";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {GeproduceerdComponent} from "./geproduceert/geproduceerd.component";
import {TrackingComponent} from "./tracking/tracking.component";

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
        path: 'tracking',
        component: TrackingComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.TRACKING,
            EnumRoles.AFSPRAKEN,
          ]
        },
      },
      {
        path: 'productie',
        component: ProductionComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.PRODUCTIE,
          ]
        },
      },
      {
        path: 'geproduceerd',
        component: GeproduceerdComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.GEPRODUCEERD,
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

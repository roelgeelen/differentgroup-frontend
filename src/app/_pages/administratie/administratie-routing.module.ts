import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdministratieComponent} from "./administratie.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {FinancieelComponent} from "./financieel/financieel.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
  {
    path: '',
    component: AdministratieComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'financieel',
        component: FinancieelComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ADMINISTRATION,
            EnumRoles.ICT
          ]
        },
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ADMINISTRATION,
            EnumRoles.ICT
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

export class AdministratieRoutingModule {
}

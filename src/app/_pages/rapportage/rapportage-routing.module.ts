import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RapportageComponent} from "./rapportage.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {FinancieelComponent} from "./Financieel/financieel.component";
import {FinancieelOldComponent} from "./Financieel-old/financieel-old.component";

const routes: Routes = [
  {
    path: '',
    component: RapportageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.RAPPORTAGE,
          ]
        }
      },
      {
        path: 'financieel',
        component: FinancieelComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.FINANCIEEL,
          ]
        }
      },
      {
        path: 'financieelold',
        component: FinancieelOldComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.FINANCIEEL,
          ]
        }
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

export class RapportageRoutingModule {
}

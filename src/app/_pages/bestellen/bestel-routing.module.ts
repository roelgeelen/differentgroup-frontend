import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BestelComponent} from "./bestel.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BestellenComponent} from "./bestellen/bestellen.component";

const routes: Routes = [
  {
    path: '',
    component: BestelComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'bestel',
        component: BestellenComponent,
        canActivate: [AuthGuard],
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

export class BestelRoutingModule {
}

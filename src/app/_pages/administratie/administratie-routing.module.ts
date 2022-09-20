import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdministratieComponent} from "./administratie.component";
import {AuthGuard} from "../../_helpers/guards/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";

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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./_pages/dashboard/dashboard.component";
import {NearbyComponent} from "./_pages/nearby/nearby.component";
import {LogisticComponent} from "./_pages/logistic/logistic.component";
import {BuildingComponent} from "./_pages/building/building.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {EnumRoles} from "./_models/enum/enumRoles";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'graph',
    loadChildren: () => import('./_pages/graphs/graph.module').then(m => m.GraphModule),
    canActivate: [AuthGuard],
    data:  { roles: [EnumRoles.OFFICE] },
  },
  {
    path: 'nearby',
    component: NearbyComponent,
    canActivate: [AuthGuard],
    data:  { roles: [EnumRoles.OFFICE] },
  },
  {
    path: 'logistiek',
    component: LogisticComponent,
    canActivate: [AuthGuard],
    data:  { roles: [EnumRoles.OFFICE] },
  },
  {
    path: 'bouw',
    component: BuildingComponent,
    canActivate: [AuthGuard],
    data:  { roles: [EnumRoles.OFFICE] },
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

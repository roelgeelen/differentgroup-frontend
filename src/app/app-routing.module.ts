import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./_components/dashboard/dashboard.component";
import {NearbyComponent} from "./_components/nearby/nearby.component";
import {LogisticComponent} from "./_components/logistic/logistic.component";
import {BuildingComponent} from "./_components/building/building.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'graph',
    loadChildren: () => import('./_components/graphs/graph.module').then(m => m.GraphModule)
  },
  { path: 'nearby', component: NearbyComponent },
  { path: 'logistiek', component: LogisticComponent },
  { path: 'bouw', component: BuildingComponent },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

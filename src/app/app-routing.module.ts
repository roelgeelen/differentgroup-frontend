import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./_components/dashboard/dashboard.component";
import {NearbyComponent} from "./_components/nearby/nearby.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nearby', component: NearbyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

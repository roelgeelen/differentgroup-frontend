import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GraphComponent} from "./graph.component";
import {ProductionComponent} from "./production/production.component";
import {InmetenComponent} from "./inmeten/inmeten.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MagazijnComponent} from "./magazijn/magazijn.component";

const routes: Routes = [
  {
    path: '',
    component: GraphComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'production',
        component: ProductionComponent
      },
      {
        path: 'inmeten',
        component: InmetenComponent
      },
      {
        path: 'magazijn',
        component: MagazijnComponent
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

export class GraphRoutingModule {
}

import {NgModule} from "@angular/core";
import {PlanningComponent} from "./planning.component";
import {PlanningRoutingModule} from "./planning-routing.module";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {GoogleChartsModule} from "angular-google-charts";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProductionComponent} from "./production/production.component";
import {GeproduceerdComponent} from './geproduceert/geproduceerd.component';
import {TrackingComponent} from './tracking/tracking.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
    PlanningRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    GoogleChartsModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  declarations: [
    PlanningComponent,
    DashboardComponent,
    ProductionComponent,
    GeproduceerdComponent,
    TrackingComponent
  ],
  exports: [
    PlanningComponent
  ]
})
export class PlanningModule {
}

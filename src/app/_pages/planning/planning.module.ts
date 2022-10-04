import {NgModule} from "@angular/core";
import {PlanningComponent} from "./planning.component";
import {PlanningRoutingModule} from "./planning-routing.module";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {GoogleChartsModule} from "angular-google-charts";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LogisticComponent} from "./logistic/logistic.component";
import {MagazijnComponent} from "./magazijn/magazijn.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProductionComponent} from "./production/production.component";
import { GeproduceerdComponent } from './geproduceert/geproduceerd.component';

@NgModule({
  imports: [
    CommonModule,
    PlanningRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    GoogleChartsModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    PlanningComponent,
    DashboardComponent,
    LogisticComponent,
    MagazijnComponent,
    ProductionComponent,
    GeproduceerdComponent
  ],
  exports: [
    PlanningComponent
  ]
})
export class PlanningModule {}

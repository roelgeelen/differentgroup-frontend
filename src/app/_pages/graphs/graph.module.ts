import {NgModule} from "@angular/core";
import {GraphComponent} from "./graph.component";
import {ProductionComponent} from "./production/production.component";
import {GraphRoutingModule} from "./graph-routing.module";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { InmetenComponent } from './inmeten/inmeten.component';
import {MatTabsModule} from "@angular/material/tabs";
import {GoogleChartsModule} from "angular-google-charts";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTableModule} from "@angular/material/table";
import {MagazijnComponent} from "./magazijn/magazijn.component";

@NgModule({
  imports: [
    CommonModule,
    GraphRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    GoogleChartsModule,
    MatTableModule
  ],
  declarations: [
    GraphComponent,
    ProductionComponent,
    MagazijnComponent,
    InmetenComponent,
    DashboardComponent
  ],
  exports: [
    GraphComponent,
    ProductionComponent
  ]
})
export class GraphModule {}

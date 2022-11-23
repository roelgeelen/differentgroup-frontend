import {NgModule} from "@angular/core";
import {RapportageComponent} from "./rapportage.component";
import {RapportageRoutingModule} from "./rapportage-routing.module";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    RapportageRoutingModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    RapportageComponent,
    DashboardComponent,
  ],
  exports: [
    RapportageComponent
  ]
})
export class RapportageModule {}

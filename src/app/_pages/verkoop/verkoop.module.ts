import {NgModule} from "@angular/core";
import {VerkoopComponent} from "./verkoop.component";
import {VerkoopRoutingModule} from "./verkoop-routing.module";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {InmetenComponent} from "./inmeten/inmeten.component";
import {AfsprakenComponent} from "./afspraken/afspraken.component";
import {MatSliderModule} from "@angular/material/slider";
import {MatIconModule} from "@angular/material/icon";
import {GoogleMapsModule} from "@angular/google-maps";
import {FormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  imports: [
    FormsModule,
    GoogleMapsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSliderModule,
    CommonModule,
    MatCardModule,
    VerkoopRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  declarations: [
    VerkoopComponent,
    DashboardComponent,
    InmetenComponent,
    AfsprakenComponent
  ],
  exports: [
    VerkoopComponent
  ]
})
export class VerkoopModule {}

import {NgModule} from "@angular/core";
import {MagazijnComponent} from "./magazijn.component";
import {MagazijnRoutingModule} from "./magazijn-routing.module";
import {CommonModule, DatePipe} from "@angular/common";
import {VoorraadComponent} from "./voorraad/voorraad.component";
import {GoogleChartsModule} from "angular-google-charts";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ControleComponent } from './controle/controle.component';
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {LogisticComponent} from "./logistic/logistic.component";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { BestellingenComponent } from './bestellingen/bestellingen.component';

@NgModule({
  imports: [
    CommonModule,
    MagazijnRoutingModule,
    GoogleChartsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    LogisticComponent,
    MagazijnComponent,
    VoorraadComponent,
    ControleComponent,
    BestellingenComponent
  ],
  exports: [
    MagazijnComponent
  ],
  providers: [
    DatePipe
  ]
})
export class MagazijnModule {}

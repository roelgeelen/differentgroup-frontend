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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {DynamicFormQuestionComponent} from "./forms/dynamic-form/dynamic-form-question/dynamic-form-question.component";
import {NgxEditorModule} from "ngx-editor";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FormComponent} from "./forms/form/form.component";
import {ImageDrawingModule} from "ngx-image-drawing";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    MatListModule,
    NgxEditorModule,
    MatProgressBarModule,
    ImageDrawingModule,
  ],
  declarations: [
    VerkoopComponent,
    DashboardComponent,
    InmetenComponent,
    AfsprakenComponent,
    FormComponent,
    DynamicFormQuestionComponent
  ],
  exports: [
    VerkoopComponent,
    MatTabsModule,
  ]
})
export class VerkoopModule {}

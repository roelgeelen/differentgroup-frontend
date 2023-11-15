import {NgModule} from "@angular/core";
import {HrmComponent} from "./hrm.component";
import {HrmRoutingModule} from "./hrm-routing.module";
import {CommonModule} from "@angular/common";
import {OntwikkelingenComponent} from './ontwikkelingen/ontwikkelingen.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {UserComponent} from './ontwikkelingen/user/user.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared.module";
import {ConversationComponent} from "./ontwikkelingen/user/conversation/conversation.component";
import {NgxEditorModule} from "ngx-editor";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    HrmRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedModule,
    NgxEditorModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    HrmComponent,
    OntwikkelingenComponent,
    UserComponent,
    ConversationComponent
  ],
  exports: [
    HrmComponent
  ],
})
export class HrmModule {
}

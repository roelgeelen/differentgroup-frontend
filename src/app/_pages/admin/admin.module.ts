import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PostsComponent} from "./posts/posts.component";
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {AdminRoutingModule} from "./admin-routing.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { PostComponent } from './posts/post/post.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    PostsComponent,
    PostComponent
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule {}

import {NgModule} from "@angular/core";
import {BestelComponent} from "./bestel.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {BestelRoutingModule} from "./bestel-routing.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { BestellenComponent } from './bestellen/bestellen.component';
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatBadgeModule} from "@angular/material/badge";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  imports: [
    CommonModule,
    BestelRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatExpansionModule,
    MatStepperModule
  ],
  declarations: [
    BestelComponent,
    DashboardComponent,
    ProductListComponent,
    ShoppingCartComponent,
    BestellenComponent
  ],
  exports: [
    BestelComponent
  ]
})
export class BestelModule {}

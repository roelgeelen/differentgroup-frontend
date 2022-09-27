import {NgModule} from "@angular/core";
import {AdministratieComponent} from "./administratie.component";
import {AdministratieRoutingModule} from "./administratie-routing.module";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {FinancieelComponent} from "./financieel/financieel.component";
import {OrderComponent} from "./order/order.component";

@NgModule({
  imports: [
    CommonModule,
    AdministratieRoutingModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    AdministratieComponent,
    DashboardComponent,
    FinancieelComponent,
    OrderComponent
  ],
  exports: [
    AdministratieComponent
  ]
})
export class AdministratieModule {}

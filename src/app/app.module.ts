import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {OAuthModule} from "angular-oauth2-oidc";
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { NearbyComponent } from './_pages/nearby/nearby.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {environment} from "../environments/environment";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSliderModule} from "@angular/material/slider";
import { BuildingComponent } from './_pages/building/building.component';
import { LogisticComponent } from './_pages/logistic/logistic.component';
import { WeatherWidgetComponent } from './_components/weather-widget/weather-widget.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {registerLocaleData} from "@angular/common";
import localeNl from '@angular/common/locales/nl';
import { NavbarComponent } from './_components/navbar/navbar.component';
registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NearbyComponent,
    BuildingComponent,
    LogisticComponent,
    WeatherWidgetComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatSliderModule,
    MatProgressBarModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true
      }
    }),
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "nl-NL" }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

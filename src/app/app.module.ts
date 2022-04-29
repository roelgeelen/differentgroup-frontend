import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CustomSpinnerComponent } from './_components/custom-spinner/custom-spinner.component';
import {MatIconModule} from "@angular/material/icon";
import {OAuthModule} from "angular-oauth2-oidc";
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { NearbyComponent } from './_components/nearby/nearby.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomSpinnerComponent,
    DashboardComponent,
    NearbyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatIconModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.differentdoors.nl/api'],
        sendAccessToken: true
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

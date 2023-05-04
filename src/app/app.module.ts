import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {OAuthModule} from "angular-oauth2-oidc";
import {HomeComponent} from './_pages/home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {environment} from "../environments/environment";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {WeatherWidgetComponent} from './_components/weather-widget/weather-widget.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CommonModule, registerLocaleData} from "@angular/common";
import localeNl from '@angular/common/locales/nl';
import {NavbarComponent} from './_components/navbar/navbar.component';
import {BirthdayWidgetComponent} from './_components/birthday-widget/birthday-widget.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatTreeModule} from "@angular/material/tree";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BlogPostComponent} from './_components/blog-post/blog-post.component';
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SharedModule} from "./shared.module";
import { WallofshameComponent } from './_pages/wallofshame/wallofshame.component';
import {BroodjesComponent} from "./_pages/broodjes/broodjes.component";
import {MatTabsModule} from "@angular/material/tabs";

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BroodjesComponent,
    WeatherWidgetComponent,
    NavbarComponent,
    BirthdayWidgetComponent,
    BlogPostComponent,
    WallofshameComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSnackBarModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true
      }
    }),
    MatTabsModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "nl-NL"},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

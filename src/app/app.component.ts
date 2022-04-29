import {Component, OnInit} from '@angular/core'
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth.config";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }

  ngOnInit(): void {
  }

}

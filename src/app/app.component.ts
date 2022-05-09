import {Component, OnInit} from '@angular/core'
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth.config";
import {AuthenticationService} from "./_services/authentication.service";
import {User} from "./_models/User";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiService} from "./_services/api.service";
import {Page} from "./_models/pages/Page";

const pages = [
  {url: '/', title: 'Dashboard', icon: 'dashboard'},
  {url: '/graph', title: 'Grafieken', icon: 'insert_chart_outlined', menu: 'graphsMenu'},
  {url: '/nearby', title: 'Afspraken dichtbij', icon: 'map'},
  {url: '/logistiek', title: 'Planning logistiek', icon: 'calendar_today'},
  {url: '/bouw', title: 'Bouw', icon: 'linked_camera'}
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  profilePic: Blob | null;
  pages: Page[] = pages;

  constructor(
    private oauthService: OAuthService,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private sanitizer: DomSanitizer
  ) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      if (this.oauthService.hasValidIdToken()) {
        authService.login();
        this.loadProfile()
      }
    });
    this.oauthService.setupAutomaticSilentRefresh();

    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  loadProfile() {
    this.apiService.getProfilePicture().subscribe(pic => {
      if (pic.body) {
        this.profilePic = pic.body;
        // @ts-ignore
        this.currentUser.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.profilePic))
      }
    })
  }

  // Sample: Logout method
  public logout() {
    this.oauthService.logOut();
  }

  get isUser() {
    return this.currentUser;
  }
}

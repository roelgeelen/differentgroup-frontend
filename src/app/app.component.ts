import {Component, OnInit} from '@angular/core'
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./_helpers/auth.config";
import {AuthenticationService} from "./_services/authentication.service";
import {User} from "./_models/User";
import {ApiService} from "./_services/api.service";
import {EnumRoles} from "./_models/enum/enumRoles";
import {navConfig} from "./_helpers/nav.config";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {Page} from "./_models/pages/Page";
import {NestedTreeControl} from "@angular/cdk/tree";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  pages = navConfig;
  dataSource = new MatTreeNestedDataSource<Page>();
  treeControl = new NestedTreeControl<Page>(page => page.pages);

  constructor(
    private oauthService: OAuthService,
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {
    this.dataSource.data = navConfig;
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      if (this.oauthService.hasValidIdToken()) {
        authService.login();
      }
    });
    this.oauthService.setupAutomaticSilentRefresh();

    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  hasChild = (_: number, node: Page) => !!node.pages && node.pages.length > 0;

  ngOnInit(): void {
  }

  get isUser() {
    return this.currentUser;
  }

  hasPermission(roles: string[]): boolean {
    if (roles.length === 0) {
      return true;
    }
    return this.currentUser.roles.filter(role => roles.includes(role)).length !== 0;
  }
}

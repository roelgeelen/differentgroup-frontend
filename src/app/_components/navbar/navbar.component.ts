import {Component, OnInit, ViewChild} from '@angular/core';
import {Page} from "../../_models/pages/Page";
import {User} from "../../_models/User";
import {AuthenticationService} from "../../_services/authentication.service";
import {ApiService} from "../../_services/api.service";
import {OAuthService} from "angular-oauth2-oidc";
import {DomSanitizer} from "@angular/platform-browser";
import {navConfig} from "../../_helpers/nav.config";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  pages = navConfig;
  dataSource = new MatTreeNestedDataSource<Page>();
  treeControl = new NestedTreeControl<Page>(page => page.pages);
  currentUser: User;
  profilePic: Blob | null;

  constructor(
    private oauthService: OAuthService,
    private authService: AuthenticationService,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {
    this.dataSource.data = navConfig;
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x
      this.loadProfile();
    });
  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: Page) => !!node.pages && node.pages.length > 0;

  closeMe(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  loadProfile() {
    this.apiService.getProfilePicture().subscribe(pic => {
      if (pic.body?.size !== 0) {
        this.profilePic = pic.body;
        // @ts-ignore
        this.currentUser.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.profilePic))
      }
    })
  }

  public logout() {
    this.oauthService.logOut();
  }

  hasPermission(roles: string[]): boolean {
    if (roles.length === 0) {
      return true;
    }
    return this.currentUser.roles.filter(role => roles.includes(role)).length !== 0;
  }
}

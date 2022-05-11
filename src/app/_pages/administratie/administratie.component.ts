import { Component, OnInit } from '@angular/core';
import {navConfig} from "../../_helpers/nav.config";
import {User} from "../../_models/User";
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-main',
  templateUrl: './administratie.component.html',
  styleUrls: ['./administratie.component.scss']
})
export class AdministratieComponent implements OnInit {
  pages: any;
  private currentUser: User;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.pages = navConfig.filter((p) => {
      return p.title === 'Administratie';
    })[0].pages
  }

  hasPermission(roles: string[]): boolean {
    if (roles.length === 0) {
      return true;
    }
    return this.currentUser.roles.filter(role => roles.includes(role)).length !== 0;
  }

}

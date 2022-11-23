import { Component, OnInit } from '@angular/core';
import {navConfig} from "../../_helpers/nav.config";
import {User} from "../../_models/User";
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-main',
  templateUrl: './rapportage.component.html',
  styleUrls: ['./rapportage.component.scss']
})
export class RapportageComponent implements OnInit {
  pages: any;
  private currentUser: User;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.pages = navConfig.filter((p) => {
      return p.title === 'Rapportage';
    })[0].pages
  }

  hasPermission(roles: string[]): boolean {
    if (roles.length === 0) {
      return true;
    }
    return this.currentUser.roles.filter(role => roles.includes(role)).length !== 0;
  }

}

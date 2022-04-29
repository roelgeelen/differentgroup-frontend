import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {User} from "../../_models/User";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  constructor(private authService: AuthenticationService) {
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit(): void {
  }

}

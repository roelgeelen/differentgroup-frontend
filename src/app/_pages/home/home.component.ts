import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {User} from "../../_models/User";
import {Card} from "../../_models/pages/card";

const links = [
  {title: "Outsmart", img: "assets/images/outsamrt.svg", content: "", link: "https://office.out-smart.com/dashboard.php"},
  {title: "OpenProject", img: "assets/images/openproject-logo-color.svg", content: "", link: "https://differentdoors.openproject.com/"},
  {title: "Hubspot", img: "assets/images/hubspot.png", content: "", link: "https://app-eu1.hubspot.com/"},
  {title: "Databox", img: "assets/images/databox-default.png", content: "", link: "https://app.databox.com/"}
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  loading = false;
  user: User;
  links: Card[] = links;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

}

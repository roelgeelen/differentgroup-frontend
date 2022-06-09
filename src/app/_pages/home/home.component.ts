import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {User} from "../../_models/User";
import {Card} from "../../_models/pages/card";
import {EnumRoles} from "../../_models/enum/enumRoles";

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
  welkom: string;
  links: Card[] = links;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    var now = new Date().getHours();
    if (now >= 6 && now < 12) {
      this.welkom = "Goeiemorgen";
    } if(now >= 12 && now < 18) {
      this.welkom = "Goedemiddag";
    } if(now >= 18 && now < 24) {
      this.welkom = "Goeienavond";
    } if(now >= 0 && now < 6) {
      this.welkom = "Nachtwerk?";
    }
  }

  get isKANTOOR() {
    return this.currentUser && this.currentUser.roles.indexOf(EnumRoles.OFFICE) !== -1;
  }

}

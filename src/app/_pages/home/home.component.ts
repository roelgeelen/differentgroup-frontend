import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {User} from "../../_models/User";
import {Card} from "../../_models/pages/card";
import {EnumRoles} from "../../_models/enum/enumRoles";
import Swal from 'sweetalert2'
import {ApiService} from "../../_services/api.service";

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

  constructor(private authService: AuthenticationService, private apiService: ApiService) {
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

  get isICT() {
    return this.currentUser && this.currentUser.roles.indexOf(EnumRoles.ICT) !== -1;
  }

  betrayUser() {
    Swal.fire({
      title: 'Ik wil ' + this.currentUser.name + ' verraden.',
      showCancelButton: true,
      imageUrl: '/assets/images/betray.png',
      imageHeight: 300,
      confirmButtonText: 'Ja, Verraden',
      confirmButtonColor: '#2e3785',
      cancelButtonText: `Nee toch niet`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiService.postToWallOfShame(this.currentUser.name, this.currentUser.email).subscribe()
        Swal.fire({
          title: 'Bedankt voor je oplettendheid, ' +this.currentUser.name + ' is je niet dankbaar.',
          icon: 'success',
          confirmButtonColor: '#2e3785',
        })
      }
    })
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {GraphUser} from "../../../_models/hrm/GraphUser";
import {FirestoreUser} from "../../../_models/hrm/FirestoreUser";

@Component({
  selector: 'app-ontwikkelingen',
  templateUrl: './ontwikkelingen.component.html',
  styleUrls: ['./ontwikkelingen.component.scss']
})
export class OntwikkelingenComponent implements OnInit {
  searchText = '';
  loading = false;
  graphUsers: GraphUser[] = [];
  sharedUsers: FirestoreUser[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getDirectReports().subscribe(u => {
      console.log(u);
      this.graphUsers = u;
      this.graphUsers.sort((a,b) => a.displayName.localeCompare(b.displayName));
      this.loading = false;
    })
    this.apiService.getSharedUsers().subscribe(u => {
      console.log(u);
      this.sharedUsers = u;
      this.loading = false;
    })
  }
}

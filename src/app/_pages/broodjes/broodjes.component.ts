import { Component, OnInit } from '@angular/core';
import {ApiJamezzService} from "../../_services/api-jamezz.service";

@Component({
  selector: 'app-broodjes',
  templateUrl: './broodjes.component.html',
  styleUrls: ['./broodjes.component.scss']
})
export class BroodjesComponent implements OnInit {
  groups: any = [];

  constructor(private ApiJamezzService: ApiJamezzService) { }

  ngOnInit(): void {
    this.getgroups();
  }

  getgroups() {
    this.ApiJamezzService.getListGroups().subscribe(g => {
      console.log(g)
    })
  }
}

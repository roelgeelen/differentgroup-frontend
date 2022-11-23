import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {MeasureTable} from "../../../_models/pages/MeasureTable";

@Component({
  selector: 'app-inmeten',
  templateUrl: './inmeten.component.html',
  styleUrls: ['./inmeten.component.scss']
})
export class InmetenComponent implements OnInit {
  loading = false;
  tableData: MeasureTable[] = [];
  displayedColumns: string[] = ['deadline', 'name', 'city', 'description', 'shortDescription'];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getOrderStatus().subscribe(data => {
      this.tableData = data;
      this.loading = false;
    })
  }

}

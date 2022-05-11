import { Component, OnInit } from '@angular/core';
import {Table} from "../../../_models/pages/table";
import {ApiService} from "../../../_services/api.service";

@Component({
  selector: 'app-inmeten',
  templateUrl: './inmeten.component.html',
  styleUrls: ['./inmeten.component.scss']
})
export class InmetenComponent implements OnInit {
  loading = false;
  tableData: Table[] = [];
  displayedColumns: string[] = ['deadline', 'name', 'city', 'description', 'shortDescription'];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getOrderStatus(1).subscribe(data => {
      this.tableData = data;
      this.loading = false;
    })
  }

}

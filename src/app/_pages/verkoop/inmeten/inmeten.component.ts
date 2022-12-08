import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {MeasureTable} from "../../../_models/pages/MeasureTable";
import {ApiGraphService} from "../../../_services/api-graph.service";

@Component({
  selector: 'app-inmeten',
  templateUrl: './inmeten.component.html',
  styleUrls: ['./inmeten.component.scss']
})
export class InmetenComponent implements OnInit {
  loading = false;
  tableData: MeasureTable[] = [];
  displayedColumns: string[] = ['deadline', 'name', 'city', 'description', 'shortDescription'];
  constructor(private apiGraphService: ApiGraphService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiGraphService.getMeasure().subscribe(data => {
      this.tableData = data;
      this.loading = false;
    })
  }

}

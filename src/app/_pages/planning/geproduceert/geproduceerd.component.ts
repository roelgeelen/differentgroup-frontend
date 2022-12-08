import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {ChartType} from "angular-google-charts";
import {ApiGraphService} from "../../../_services/api-graph.service";

@Component({
  selector: 'app-geproduceert',
  templateUrl: './geproduceerd.component.html',
  styleUrls: ['./geproduceerd.component.scss']
})
export class GeproduceerdComponent implements OnInit {
  loading = false;
  myData = [];
  chartColumns = [];
  type = ChartType.ColumnChart;
  myOptions = {
    colors: ['#4658a0', '#06af85',],
    height: 400,
    backgroundColor: 'transparent',
    legend: {position: 'top', maxLines: 0},
    bar: {groupWidth: '75%'},
    chartArea: {
      left: 43,
      height: 300,
      width: '100%'
    },
    isStacked: true,
    series: {6: {type: 'line'}}
  };
  dynamicResize = true;

  constructor(private apiGraphService: ApiGraphService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.apiGraphService.getProduced().subscribe(data => {
      this.chartColumns = data[0];
      data.splice(0, 1);
      data.forEach((item: any, index: number) => {
        item[1] = +item[1]
        item[2] = +item[2]
      });
      this.loading = false;
      this.myData = data;
    });
  }

}

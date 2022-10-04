import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {ChartType} from "angular-google-charts";

@Component({
  selector: 'app-geproduceert',
  templateUrl: './geproduceert.component.html',
  styleUrls: ['./geproduceert.component.scss']
})
export class GeproduceertComponent implements OnInit {
  loading = false;
  myData = [];
  chartColumns = [];
  type = ChartType.ColumnChart;
  myOptions = {
    colors: ['#4658a0', '#FFFF00', '#7382bf', '#00994d', '#06af85', '#dcdcdc', '#ff0000'],
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

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getGeproduceert().subscribe(data => {
      console.log(data);
      this.chartColumns = data[0];
      data.splice(0, 1);
      data.forEach((item: any, index: number) => {
        item[1] = +item[1]
      });
      this.loading = false;
      this.myData = data;
    });
  }

}

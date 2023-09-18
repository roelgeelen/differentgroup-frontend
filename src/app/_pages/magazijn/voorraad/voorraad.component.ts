import {Component, OnInit} from '@angular/core';
import {ChartType} from "angular-google-charts";
import {ApiService} from "../../../_services/api.service";
import {ApiStockroomService} from "../../../_services/api-stockroom.service";

@Component({
  selector: 'app-production',
  templateUrl: './voorraad.component.html',
  styleUrls: ['./voorraad.component.scss']
})
export class VoorraadComponent implements OnInit {
  loading = false;
  myData = [];
  chartColumns = [];
  type = ChartType.ColumnChart;
  myOptions = {
    colors: ['#4658a0','#6a7dc7', '#06af85', '#ff0000'],
    height: 500,
    backgroundColor: 'transparent',
    legend: {position: 'top', maxLines: 0},
    bar: {groupWidth: '75%'},
    chartArea: {
      left: 40,
      width: '100%'
    },
    isStacked: true,
    series: {3: {type: 'line'}}
  };
  dynamicResize = true;

  valueExpected: number = 0;
  value!: number;
  valueH!: number;
  constructor(private apiStockroomService: ApiStockroomService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.apiStockroomService.getStockroom().subscribe(data => {
      this.chartColumns = data[0];
      this.value = data[1][1];
      this.valueH = data[1][2];
      data.splice(0, 1);
      data.forEach((item: any, index: number) => {
        item[1] = +item[1]
        item[2] = +item[2]
        item[3] = +item[3]
        item[4] = +item[4]
        this.valueExpected += item[3] << 0;
      });
      this.loading = false;
      this.myData = data;
    });
  }

}

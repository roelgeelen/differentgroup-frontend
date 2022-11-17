import {Component, OnInit} from '@angular/core';
import {ChartType} from "angular-google-charts";
import {ApiService} from "../../../_services/api.service";

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
    colors: ['#4658a0', '#06af85', '#ff0000'],
    height: 500,
    backgroundColor: 'transparent',
    legend: {position: 'top', maxLines: 0},
    bar: {groupWidth: '75%'},
    chartArea: {
      left: 40,
      width: '100%'
    },
    isStacked: true,
    series: {2: {type: 'line'}}
  };
  dynamicResize = true;

  valueExpected: number = 0;
  value!: number;
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getMagazijn().subscribe(data => {
      this.chartColumns = data[0];
      this.value = data[1][1];
      data.splice(0, 1);
      data.forEach((item: any, index: number) => {
        item[1] = +item[1]
        item[2] = +item[2]
        item[3] = +item[3]
        this.valueExpected += item[2] << 0;
      });
      this.loading = false;
      this.myData = data;
    });
  }

}

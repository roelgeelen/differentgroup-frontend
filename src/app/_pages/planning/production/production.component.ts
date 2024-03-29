import {Component, OnInit} from '@angular/core';
import {ChartType} from "angular-google-charts";
import {ApiGraphService} from "../../../_services/api-graph.service";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
  loading = false;
  loadingT = false;
  loadingI = false;
  loadingU = false;
  myData = [];
  chartColumns = [];
  type = ChartType.ColumnChart;
  myOptions = {
    colors: [
      '#00994d',
      '#06af85',
      '#7c46a0',
      '#4658a0',
      '#7382bf',
      '#626262',
      '#dcdcdc',
      '#231e1f',
      '#ff0000'
    ],
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
    series: {8: {type: 'line'}},
    vAxis: {
      maxValue:300,
    },
    hAxis: {
      textStyle: {
        fontSize: 14 // or the number you want
      }
    }
  };
  dynamicResize = true;

  valueOrders!: number;
  valueProjects!: number;
  valueInplan!: number;
  valueUB!: number;

  constructor(private apiGraphService: ApiGraphService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadingT = true;
    this.loadingI = true;
    this.loadingU = true;
    this.apiGraphService.getProductionv2().subscribe(data => {
      this.chartColumns = data[0];
      data.splice(0, 1);
      data.forEach((item: any, index: number) => {
        if (item.length == 2) {
          data.splice(index, 1);
        }
        item[1] = +item[1]
        item[2] = +item[2]
        item[3] = +item[3]
        item[4] = +item[4]
        item[5] = +item[5]
        item[6] = +item[6]
        item[7] = +item[7]
        item[8] = +item[8]
        item[9] = +item[9]
      });
      this.loading = false;
      this.myData = data;
    });

    this.apiGraphService.getOrders().subscribe(data => {
      this.valueOrders = data.value;
      this.loadingT = false;
    });

    this.apiGraphService.getProjects().subscribe(data => {
      this.valueProjects = data.value;
      this.loadingT = false;
    });

    this.apiGraphService.getSchedule().subscribe(data => {
      this.valueInplan = data.value;
      this.loadingI = false;
    });

    this.apiGraphService.getUB().subscribe(data => {
      this.valueUB = data.value;
      this.loadingU = false;
    })
  }

}

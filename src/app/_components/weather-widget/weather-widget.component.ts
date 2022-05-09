import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeatherService} from "../../_services/weather.service";

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  data: { name: string, image: string, main: any, dt: number, dt_txt: string; sys: any; wind: any; weather: any[]};
  dataForecast: any;
  loading = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.loading = true;
    this.weatherService.getWeatherForCity().subscribe(data => {
      this.data = data;
      this.loading = false;
    });
    // @ts-ignore
    this.weatherService.getWeatherForecast().subscribe((data: { list: any[] }) => {
      this.dataForecast = data.list.filter(function (d) {
        return d.dt_txt.split(' ')[1].split(':')[0] === '12'
      });
    })
  }
}

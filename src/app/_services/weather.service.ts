import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherForCity(): Observable<any> {
    const path = `https://api.openweathermap.org/data/2.5/weather?q=Budel&lang=nl&units=metric&APPID=37b9eedf416315f8ac8b6981ae046e93`;
    return this.http.get(path).pipe(
      map(data => ({
        ...data,
        // @ts-ignore
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      })),
    );
  }

  getWeatherForecast() {
    const path = `https://api.openweathermap.org/data/2.5/forecast?q=Budel&lang=nl&units=metric&APPID=37b9eedf416315f8ac8b6981ae046e93`;
    return this.http.get(path);
  }
}

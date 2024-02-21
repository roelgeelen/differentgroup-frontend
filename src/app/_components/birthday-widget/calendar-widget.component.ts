import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../_services/api.service";
import {Event} from "../../_models/calendar/Event";


@Component({
  selector: 'app-birthday-widget',
  templateUrl: './calendar-widget.component.html',
  styleUrls: ['./calendar-widget.component.scss']
})
export class CalendarWidgetComponent implements OnInit {
  loading = false;
  events: Event[] = [];
  error: string;

  constructor(@Inject(ApiService)private apiService: ApiService) { }

  ngOnInit(): void {
    this.loading = true
    this.apiService.getBirthdays().subscribe(e => {
      this.events = e
      console.log(e)
      this.loading = false;
    }, error => {
      this.error = "Je hebt nog geen toegang tot deze kalender";
      this.loading = false;
    });
  }

  isToday(inputDate: Date) {
     return (new Date(inputDate)).setHours(0,0,0,0) === (new Date()).setHours(0,0,0,0)
  }

  toInt(year: any) {
    return year
  }

  isBirthday(event: Event) {
    return event.categories.includes('Verjaardag')
  }
}

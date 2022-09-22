import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../_services/api.service";
import {Event} from "../../_models/calendar/Event";


@Component({
  selector: 'app-birthday-widget',
  templateUrl: './birthday-widget.component.html',
  styleUrls: ['./birthday-widget.component.scss']
})
export class BirthdayWidgetComponent implements OnInit {
  @ViewChild('bdayElem') el:ElementRef;
  timer: any;
  loading = false;
  bdays: Event[] = [];
  error: string;

  constructor(@Inject(ApiService)private apiService: ApiService) { }

  ngOnInit(): void {
    this.loading = true
    this.apiService.getBirthdays().subscribe(e => {
      this.bdays = e
      this.loading = false;
    }, error => {
      this.error = "Je hebt nog geen toegang tot deze kalender";
      this.loading = false;
    });
  }

  isToday(inputDate: Date) {
     return (new Date(inputDate)).setHours(0,0,0,0) === (new Date()).setHours(0,0,0,0)
  }
}

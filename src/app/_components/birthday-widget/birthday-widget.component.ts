import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../_services/api.service";
import {Event} from "../../_models/calendar/Event";
// @ts-ignore
import * as confetti from "canvas-confetti";


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
  myConfetti: confetti;

  constructor(@Inject(ApiService)private apiService: ApiService) { }

  ngOnInit(): void {
    this.loading = true
    this.apiService.getBirthdays().subscribe(e => {
      this.bdays = e
      if (this.isToday(this.bdays[0].start.dateTime)) {
        this.timer = this.showConfetti();
      }
      this.loading = false;
    }, error => {
      this.error = "Je hebt nog geen toegang tot deze kalender";
      this.loading = false;
    });
    this.myConfetti = confetti.create(this.el, {
      resize: true
    });
  }

  isToday(inputDate: Date) {
     return (new Date(inputDate)).setHours(0,0,0,0) === (new Date()).setHours(0,0,0,0)
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

  showConfetti() {
    return setInterval(() => {
      // since particles fall down, start a bit higher than random
      // @ts-ignore
      this.myConfetti(Object.assign({}, { startVelocity: 25, spread: 360, ticks: 150, zIndex: 1 }, { particleCount: 100, origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      this.myConfetti(Object.assign({}, { startVelocity: 25, spread: 360, ticks: 150, zIndex: 1 }, { particleCount: 100, origin: { x: this.randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 3000);
  }

  randomInRange(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }



}

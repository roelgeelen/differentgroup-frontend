import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './stoplichten.component.html',
  styleUrls: ['./stoplichten.component.scss']
})
export class StoplichtenComponent implements OnInit {
  width = window.innerWidth - 66;
  height = window.innerHeight - 283;

  constructor() {
  }

  ngOnInit(): void {
  }

}

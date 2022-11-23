import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  width = window.innerWidth - 66;
  height = window.innerHeight - 283;

  constructor() {
  }

  ngOnInit(): void {
  }

}

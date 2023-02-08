import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallofshame',
  templateUrl: './wallofshame.component.html',
  styleUrls: ['./wallofshame.component.scss']
})
export class WallofshameComponent implements OnInit {
  width = window.innerWidth -5;
  height = window.innerHeight -150;
  constructor() { }

  ngOnInit(): void {
  }

}

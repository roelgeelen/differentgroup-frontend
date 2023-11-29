import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './financieel-old.component.html',
  styleUrls: ['./financieel-old.component.scss']
})
export class FinancieelOldComponent implements OnInit {
  width = window.innerWidth - 66;
  height = window.innerHeight - 283;

  constructor() {
  }

  ngOnInit(): void {
  }

}

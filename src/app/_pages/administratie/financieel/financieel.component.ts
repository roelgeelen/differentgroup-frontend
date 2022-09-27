import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './financieel.component.html',
  styleUrls: ['./financieel.component.scss']
})
export class FinancieelComponent implements OnInit {
  width = window.innerWidth - 66;
  height = window.innerHeight - 283;

  constructor() {
  }

  ngOnInit(): void {
  }

}

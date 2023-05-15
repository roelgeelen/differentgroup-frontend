import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bestellingen',
  templateUrl: './bestellingen.component.html',
  styleUrls: ['./bestellingen.component.scss']
})
export class BestellingenComponent implements OnInit {
  width = window.innerWidth - 66;
  height = window.innerHeight - 283;

  constructor() { }

  ngOnInit(): void {
  }

}

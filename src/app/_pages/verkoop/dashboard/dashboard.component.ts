import { Component, OnInit } from '@angular/core';
import {Card} from "../../../_models/pages/card";

const graphs = [
  {title: "Productie", img: "assets/images/combination-chart-bar-line-graph-512.png", content: "Productie grafiek", link: "production"},
  {title: "Inmeten", img: "assets/images/table-512.png", content: "Inmeten tabel", link: "inmeten"},
  {title: "Magazijn", img: "assets/images/combination-chart-bar-line-graph-512.png", content: "Magazijn grafiek", link: "voorraad"},
]

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  width = window.innerWidth - 66;
  height = window.innerHeight - 283;
  constructor() { }

  ngOnInit(): void {
  }

}

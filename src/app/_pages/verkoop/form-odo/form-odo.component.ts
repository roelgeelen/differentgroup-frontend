import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-odo',
  templateUrl: './form-odo.component.html',
  styleUrls: ['./form-odo.component.scss']
})
export class FormOdoComponent implements OnInit {
  fullscreen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

}

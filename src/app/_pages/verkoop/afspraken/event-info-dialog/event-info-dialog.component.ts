import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CalendarEvent} from "angular-calendar";

@Component({
  selector: 'app-event-info-dialog',
  templateUrl: './event-info-dialog.component.html',
  styleUrls: ['./event-info-dialog.component.scss']
})
export class EventInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CalendarEvent) {}
}

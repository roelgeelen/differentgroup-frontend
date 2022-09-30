import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import {Injectable} from "@angular/core";
import {NativeDateAdapter} from "@angular/material/core";

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  public override weekViewHour({date, locale}: DateFormatterParams): string {
    // change this to return a different date format
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date);
  }
}

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1
  }
}

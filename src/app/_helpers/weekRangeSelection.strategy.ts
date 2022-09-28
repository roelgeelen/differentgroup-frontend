import {Injectable} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
} from '@angular/material/datepicker';

@Injectable()
export class WeekRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {
  }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -this._dateAdapter.getDayOfWeek(date)+1);
      const end = this._dateAdapter.addCalendarDays(date, 7 - this._dateAdapter.getDayOfWeek(date));
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

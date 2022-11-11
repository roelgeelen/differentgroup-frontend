import {Injectable} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
} from '@angular/material/datepicker';

@Injectable()
export class AddDaysRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
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
      const end = this._dateAdapter.addCalendarDays(date, 3);
      return new DateRange<D>(date, end);
    }

    return new DateRange<D>(null, null);
  }
}

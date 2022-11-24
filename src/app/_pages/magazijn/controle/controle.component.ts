import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {CustomDateAdapter} from "../../verkoop/afspraken/custom-date-formatter.provider";
import {addDays} from "date-fns";
import {DateAdapter} from "@angular/material/core";
import {AddDaysRangeSelectionStrategy} from "../../../_helpers/addDaysRangeSelection.strategy";
import {DatePipe} from "@angular/common";
import {ControlTable} from "../../../_models/pages/ControlTable";

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: AddDaysRangeSelectionStrategy
    },
    {provide: DateAdapter, useClass: CustomDateAdapter},


  ]
})
export class ControleComponent implements OnInit {
  start: Date = new Date();
  end: Date  = addDays(new Date(), 3);
  type: string = "OPENSLAANDE";
  loading = false;
  tableData: ControlTable[] = [];
  displayedColumns: string[] = ['workDate', 'workTime', 'no', 'employee', 'memo','shortMemo', 'link'];
  constructor(private apiService: ApiService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.loading = true;
    this.apiService.getControle(this.datepipe.transform(this.start, 'yyyy-MM-dd'), this.datepipe.transform(this.end, 'yyyy-MM-dd'), this.type).subscribe(data => {
      this.tableData = data;
      console.log(data);
      this.loading = false;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {Table} from "../../../_models/pages/table";
import {ApiService} from "../../../_services/api.service";
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {CustomDateAdapter} from "../../verkoop/afspraken/custom-date-formatter.provider";
import {addDays} from "date-fns";
import {DateAdapter} from "@angular/material/core";
import {AddDaysRangeSelectionStrategy} from "../../../_helpers/addDaysRangeSelection.strategy";
import {DatePipe} from "@angular/common";

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
  loading = false;
  tableData: Table[] = [];
  displayedColumns: string[] = ['deadline', 'name', 'city', 'description', 'shortDescription', 'link'];
  constructor(private apiService: ApiService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.loading = true;
    this.apiService.getControle(this.datepipe.transform(this.start, 'yyyy-MM-dd'), this.datepipe.transform(this.end, 'yyyy-MM-dd')).subscribe(data => {
      this.tableData = data;
      this.loading = false;
    })
  }
}

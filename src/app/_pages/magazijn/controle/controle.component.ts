import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {CustomDateAdapter} from "../../verkoop/afspraken/custom-date-formatter.provider";
import {addDays, subDays} from "date-fns";
import {DateAdapter} from "@angular/material/core";
import {AddDaysRangeSelectionStrategy} from "../../../_helpers/addDaysRangeSelection.strategy";
import {DatePipe} from "@angular/common";
import {ControlTable} from "../../../_models/pages/ControlTable";
import {ApiStockroomService} from "../../../_services/api-stockroom.service";

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss'],
})
export class ControleComponent implements OnInit {
  date: Date = addDays(new Date(), 1);
  type: string = "OPENSLAANDE";
  loading = false;
  tableData: ControlTable[] = [];
  displayedColumns: string[] = ['workDate', 'workTime', 'customer','customerNo','no', 'employee', 'memo','shortMemo', 'link', 'check'];
  constructor(private apiStockroomService: ApiStockroomService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.loading = true;
    this.apiStockroomService.getControl(this.datepipe.transform(this.date, 'yyyy-MM-dd'), this.type).subscribe(data => {
      this.tableData = data;
      this.loading = false;
    })
  }

  prev() {
    this.date = subDays(this.date, 1);
    this.getTable();
  }

  next() {
    this.date = addDays(this.date, 1);
    this.getTable();
  }

  updatePriority(element: ControlTable) {
    this.apiStockroomService.updatePick(element.id, !element.priorityCode).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import {Table} from "../../../_models/pages/table";
import {GraphService} from "../../../_services/graph/graph.service";

@Component({
  selector: 'app-inmeten',
  templateUrl: './inmeten.component.html',
  styleUrls: ['./inmeten.component.scss']
})
export class InmetenComponent implements OnInit {
  loading = false;
  tableData: Table[] = [];
  displayedColumns: string[] = ['deadline', 'name', 'city', 'description', 'shortDescription'];
  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
    this.loading = true;
    this.graphService.getOrderStatus(1).subscribe(data => {
      this.tableData = data;
      this.loading = false;
    })
  }

}

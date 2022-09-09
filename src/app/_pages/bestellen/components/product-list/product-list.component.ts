import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../Product";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() products: any[];
  @Output() productAdded = new EventEmitter();
  displayedColumns: string[] = ['no', 'name', 'amount', 'unit', 'addable'];
  dataSource = new MatTableDataSource<Product>();
  search: string = '';

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getProducts() {
    this.dataSource.data = this.products;
  }

  addProductToCart(product: any) {
    this.productAdded.emit(product);
  }

  doFilter (value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

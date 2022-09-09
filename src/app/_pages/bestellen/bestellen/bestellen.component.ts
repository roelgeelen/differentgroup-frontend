import { Component, OnInit } from '@angular/core';
import {Product} from "../components/Product";

@Component({
  selector: 'app-bestellen',
  templateUrl: './bestellen.component.html',
  styleUrls: ['./bestellen.component.scss']
})
export class BestellenComponent {
  productList: Product[] = [
    {no: '123', name: 'Schroeven', amount: 10, unit: 'stuks'},
    {no: '34', name: 'Bouten', amount: 10, unit: 'stuks'},
    {no: '4356', name: 'Scharnier', amount: 1, unit: 'stuks'},
    {no: '13', name: 'Vulplaatjes', amount: 3, unit: 'stuks'},
    {no: '1234', name: 'Schroeven', amount: 10, unit: 'stuks'},
    {no: '34', name: 'Bouten', amount: 10, unit: 'stuks'},
    {no: '4356', name: 'Scharnier', amount: 1, unit: 'stuks'},
    {no: '13', name: 'Vulplaatjes', amount: 3, unit: 'stuks'},
    {no: '123', name: 'Schroeven', amount: 10, unit: 'stuks'},
    {no: '34', name: 'Bouten', amount: 10, unit: 'stuks'},
    {no: '4356', name: 'Scharnier', amount: 1, unit: 'stuks'},
    {no: '13', name: 'Vulplaatjes', amount: 3, unit: 'stuks'},
    {no: '123', name: 'Schroeven', amount: 10, unit: 'stuks'},
    {no: '34', name: 'Bouten', amount: 10, unit: 'stuks'},
    {no: '4356', name: 'Scharnier', amount: 1, unit: 'stuks'},
    {no: '13', name: 'Vulplaatjes', amount: 3, unit: 'stuks'},
    {no: '123', name: 'Schroeven', amount: 10, unit: 'stuks'},
    {no: '34', name: 'Bouten', amount: 10, unit: 'stuks'},
    {no: '4356', name: 'Scharnier', amount: 1, unit: 'stuks'},
    {no: '13', name: 'Vulplaatjes', amount: 3, unit: 'stuks'},
    {no: '123', name: 'Schroeven', amount: 10, unit: 'stuks'},
    {no: '34', name: 'Bouten', amount: 10, unit: 'stuks'},
    {no: '4356', name: 'Scharnier', amount: 1, unit: 'stuks'},
    {no: '13', name: 'Vulplaatjes', amount: 3, unit: 'stuks'},
  ];
  cartProductList: Product[] = [];

  addProductToCart(product: Product) {
    const productExistInCart = this.cartProductList.find(({no}) => no === product.no);
    if (!productExistInCart) {
      this.cartProductList.push({...product, num:1});
      return;
    }
    // @ts-ignore
    productExistInCart.num += 1;
  }
  removeProduct(product: any) {
    this.cartProductList = this.cartProductList.filter(({no}) => no !== product.no)
  }
}

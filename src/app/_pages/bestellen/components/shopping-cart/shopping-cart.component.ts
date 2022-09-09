import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  @Input() products: any[];
  @Output() productRemoved = new EventEmitter();
  modelChanged(product: any) {
    if (product.num === 0) {
      this.removeProduct(product)
    }
  }
  calcTotal() {
    return this.products.reduce((acc, prod) => acc+= prod.num ,0)
  }
  removeProduct(product: any) {
    this.productRemoved.emit(product)
  }
}

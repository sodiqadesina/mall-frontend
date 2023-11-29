import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any = [];
  cartTotal: number;
  overallTotal: number = 0
  constructor(private cartData: CartService, ) { }

  ngOnInit(): void {
    this.getCartProducts()
  }
  getCartProducts() {
    this.carts = JSON.parse(sessionStorage.getItem('cart'));
    this.cartTotal = JSON.parse(sessionStorage.getItem('cartTotal'))
    if (this.cartTotal === 0) {
      
    }
    this.overallTotal = this.cartTotal + 0
    this.cartData.cartUpdate.subscribe(
      res => {
        if (res['cartUpdate'] == true) {
          this.cartTotal = JSON.parse(sessionStorage.getItem('cartTotal'))
          this.carts = JSON.parse(sessionStorage.getItem('cart'));
          if (this.cartTotal === 0) {
      
          }
          this.overallTotal = this.cartTotal + 0
        }
      }
    )
     console.log(this.carts);

  }

  removeItem(product) {
    this.cartData.removeFromCart(product)
  }
  increaseQuantity(product) {
    this.cartData.increaseQuantity(product, 1)
  }
  deceaseQuantity(product) {
    this.cartData.reduceQuantity(product, 1)
  }

}

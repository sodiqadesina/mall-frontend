import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Array<any> = []
  duplicates: number = 0
  cartTotal: number = 0;
  cartUpdate: BehaviorSubject<{ cartUpdate: boolean }> = new BehaviorSubject<{ cartUpdate: boolean }>({ cartUpdate: false })
  api = environment.api + 'auth/'
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  addTocart(productDetails, quantity) {
    console.log(this.cart);

    this.duplicates = 0
    if (sessionStorage.getItem('cart')) {
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    if (this.cart.length > 0) {
      for (let index = 0; index < this.cart.length; index++) {
        if (this.cart[index]._id == productDetails._id) {
          if (this.cart[index].quantity + quantity >= productDetails.quantities) {
            return
          }
          this.cart[index].quantity = +this.cart[index].quantity + quantity;
          this.duplicates++
          this.toastr.success("Item Added Successfully")
        }
        if (index == this.cart.length - 1) {
          if (this.duplicates == 0) {
            productDetails.quantity = quantity
            this.cart.push(productDetails)
            this.toastr.success("Item Added Successfully")
            this.cartSubmission();
            return
          } else {
            this.cartSubmission();
          }
        }

      }
    } else {
      productDetails.quantity = quantity
      this.cart.push(productDetails)
      this.toastr.success("Item Added Successfully")
      this.cartSubmission();
    }
    // setTimeout(() => {
    //   this.toastr.success("Item Added Successfully")
    // }, 100);
  }
  removeFromCart(index) {
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    this.cart.splice(index, 1);
    this.cartSubmission();
  }

  reduceQuantity(productDetails, quantity) {
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index].quantity <= 1) {
        this.removeFromCart(productDetails)
      }
      if (this.cart[index]._id == productDetails._id) {
        this.cart[index].quantity = +this.cart[index].quantity - quantity;
      }
      if (index == this.cart.length - 1) {
        this.cartSubmission();
      }
    }
  }
  increaseQuantity(productDetails, quantity) {
    this.cart = JSON.parse(sessionStorage.getItem('cart'));
    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index]._id == productDetails._id) {
        if (this.cart[index].quantity >= productDetails.quantities) {
          return
        }
        this.cart[index].quantity = +this.cart[index].quantity + quantity;
      }
      if (index == this.cart.length - 1) {
        this.cartSubmission();
      }
    }
  }
  cartSubmission() {
    this.cartTotal = 0;
    this.cart.forEach(element => {
      this.cartTotal = this.cartTotal + (+element.price * element.quantity)
    })
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    sessionStorage.setItem('cartTotal', JSON.stringify(this.cartTotal));
    this.cartUpdate.next({ cartUpdate: true });
    setTimeout(() => {
      this.cartUpdate.next({ cartUpdate: false });
    }, 1000);
  }
  removeAll() {
    sessionStorage.removeItem('cart')
    sessionStorage.removeItem('cartTotal')
    this.cart = [];
    this.cartTotal = 0
    this.cartUpdate.next({ cartUpdate: true });
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service'
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  carts: any = [];
  cartTotal: number;
  overallTotal: number;
  payMethod;
  loading;
  reference;
  currentUser;
  constructor(
    private cartData: CartService, 
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.getCartProducts()
    this.getCurrentUser()
  }
  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((res:any)=>{
      this.currentUser = res.data
      console.log(this.currentUser);
      
    })
  }
  getCartProducts() {
    this.carts = JSON.parse(sessionStorage.getItem('cart'));
    this.cartTotal = JSON.parse(sessionStorage.getItem('cartTotal'))
    if(!this.carts || this.carts.length === 0){
      this.router.navigate(["/customer/main/"])
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
  removeAll() {
    this.cartData.removeAll()
  }
  paymentInit() {
    this.loading = true
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.loading = true
    const value = {
      deliveryMethod: "PAYSTACK",
      status: "NEW", 
      products: this.carts
    }
    console.log("Im done with the object");
    
    this.orderService.addOrder(value).subscribe((res:any)=>{
      console.log(res);
      
      this.router.navigate([`/customer/main/order-success/${res.data._id}`])

      this.cartData.removeAll()
    })
    
  }
  createOrder() {
    const value = {
      deliveryMethod: "POC",
      status: "NEW",
      products: this.carts
    }
    this.orderService.addOrder(value).subscribe((res:any)=>{
      console.log(res);
      
      this.router.navigate([`/customer/main/order-success/${res.data._id}`])

      this.cartData.removeAll()
    })
  }

  paymentCancel() {
    this.router.navigate(["/customer/main/order-failed"])
    console.log('payment failed');
}
  radioHandler(event) {
    this.payMethod = event.target.value;
    console.log(this.payMethod);
    
  }

}

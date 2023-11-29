import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userIsAuthenticated = false;
  carts: any = [];
  user;
  cartTotal: number;
  private authListenerSub: Subscription;
  constructor(private authService: AuthService, private cartData: CartService,) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getAuth();
    console.log(this.userIsAuthenticated);
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(this.userIsAuthenticated);

      });
    this.getCart()
  }
  getCart() {
    this.cartData.cartUpdate.subscribe(
      res => {
        if (res['cartUpdate']) {
          if (sessionStorage.getItem('cart')) {
            this.carts = JSON.parse(sessionStorage.getItem('cart'));
            console.log(this.carts);

            this.cartTotal = JSON.parse(sessionStorage.getItem('cartTotal'))
            console.log(this.carts, this.cartTotal);

          } else {
            this.carts = []
            this.cartTotal = 0
          }
        }
        if (sessionStorage.getItem('cart')) {
          this.carts = JSON.parse(sessionStorage.getItem('cart'));

          this.cartTotal = JSON.parse(sessionStorage.getItem('cartTotal'))

        }

      }
    )
  }
  
  onLogout() {
    this.authService.logout()
  }

}

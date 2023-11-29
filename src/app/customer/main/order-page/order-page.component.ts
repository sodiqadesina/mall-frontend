import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  user;
  orders;
  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.authService.getCurrentUser().subscribe((res:any)=>{
      this.user = res.data
      console.log(this.user);
      this.orderService.getOrdersByUserId(this.user._id).subscribe((res:any)=> {
        this.orders = res.data
        console.log(res.data);
        
        
      })
      
    })
   }
   getTotalPrice(products) {
    let productTotal = 0
    products.forEach(element => {
        productTotal += (element.price * element.quantity)
    });
    return productTotal
  }
}

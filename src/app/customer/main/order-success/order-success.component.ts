import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  orderId
  order
  constructor(public route: ActivatedRoute, public router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.orderId = paramMap.get('id')
        console.log(this.orderId);
        this.orderService.getOrdersById(this.orderId).subscribe((res:any)=>{
          console.log(res);
          
          this.order = res.data
        })
        
      }
    })
  }
  getTotalPrice(products) {
    if (products) {
      let productTotal = 0
      products.forEach(element => {
          productTotal += (element.price * element.quantity)
      });
      return productTotal
      
    }
  }

}

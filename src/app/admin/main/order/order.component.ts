import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, tap, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  page = 1
  limit = 15
  orders
  prev
  next
  searchTerm
  searchMode = false
  pkData;
  // searchIds$ = new BehaviorSubject<unknown>('')
  // searchOrders$: Observable<any[]> = this.searchIds$.pipe(
  //   debounceTime(600),
  //   switchMap(searchOrderText=> {
  //     return this.ordersService.getOrdersById(searchOrderText)
  //   }),
  //   map( (data:any)=> data.data)
  // )
  constructor(private ordersService:OrderService, private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.getOrdersByPage(this.page, this.limit)
    
  }
  getOrdersByPage(page, limit) {
    this.ordersService.getOrdersByPage(page, limit).subscribe((res:any)=>{
      console.log(res);
      this.orders = res.data
      this.prev = res.pagination.prev
      this.next = res.pagination.next
    })
  }
  onPrev() {
    this.getOrdersByPage(this.prev.page, this.prev.limit)
  }
  onNext() {
    this.getOrdersByPage(this.next.page, this.next.limit)
  }
  updateOrder(id, value, modalId) {
    console.log(modalId);
    
    if (value =="NEW") {
      this.ordersService.updateOrder(id,{status: "NEW"}).subscribe((res:any)=>{
        this.toastr.success("Order Updated to NEW")
        if (modalId === '') {
          this.pkData = res.data
          console.log(this.pkData);
          
          let div = document.getElementById(`pkModal`)
        div.click()
        this.ngOnInit()
        }
        let div = document.getElementById(`exampleModalCenter${modalId}`)
        div.click()
        this.ngOnInit()
      })
      
    }
    if (value == "COMPLETED") {
      this.ordersService.updateOrder(id, {status: "COMPLETED"}).subscribe((res:any)=>{
        this.toastr.success("Order Updated to COMPLETED")
        if (modalId === '') {
          this.pkData = res.data
          let div = document.getElementById(`pkModal`)
        div.click()
        this.ngOnInit()
        }
        let div = document.getElementById(`exampleModalCenter${modalId}`)
        div.click()
        this.ngOnInit()

      })
      
    }
  }
  getTotalPrice(products) {
    let productTotal = 0
    products.forEach(element => {
        productTotal += (element.price * element.quantity)
    });
    return productTotal
  }

  // doIdSearch() {
  //   console.log(this.searchTerm);
    
  //   this.searchIds$.next(this.searchTerm)
  // }

  search(form: NgForm) {
    console.log(form);
    this.ordersService.getOrdersByPk(form.value.search).subscribe((res:any)=>{
      this.searchMode = true
      this.pkData = res.data
    }, err=>{
      console.log(err);
      
    })
    
  }
  return() {
    this.searchMode = false;
    this.pkData = undefined
  }
}

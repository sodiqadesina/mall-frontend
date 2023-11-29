import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products;
  categories;
  users;
  orders;
  constructor(private productsService: ProductService,
    private categoriesService: CategoryService,
    private userService: UserService,
    private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
    this.getUsers()
    this.getOrders()
  }
  getProducts() {
    this.productsService.adminGetAllProducts().subscribe((res:any)=>{
      this.products = res.data
    })
  }
  getCategories() {
    this.categoriesService.getAllCategories().subscribe((res:any)=>{
      this.categories = res.data
    })
  }
  getUsers() {
    this.userService.getAllUsers().subscribe((res:any)=>{
      this.users = res.data
    })
  }
  getOrders() {
    this.orderService.getOrders().subscribe((res:any)=>{
      this.orders = res.data
      console.log(this.orders);

    })
  }
}

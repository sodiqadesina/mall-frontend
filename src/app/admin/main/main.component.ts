import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';
import { OrderService } from 'src/app/service/order.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  products;
  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  onRoute(string) {
    this.router.navigateByUrl(`/admin/main/${string}`)
  }
  logout() {
    this.authService.logout()
  }
  
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductCategoryComponent } from './product/product-category/product-category.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { FormsModule } from '@angular/forms';
import { OrderPageComponent } from './order-page/order-page.component';


@NgModule({
  declarations: [MainComponent, LandingComponent, AboutComponent, ProductComponent, CartComponent, ProductViewComponent, CheckoutComponent, OrderComponent, OrderSuccessComponent, ProductCategoryComponent, OrderPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    Angular4PaystackModule.forRoot('pk_test_bc9d400332e0dfb3791e43bbf11f66b7fd102fc8'),
  ]
})
export class MainModule { }

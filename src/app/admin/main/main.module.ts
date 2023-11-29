import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MainComponent, DashboardComponent, ProductComponent, CategoryComponent, UserComponent, OrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    NgbModule
  ]
})
export class MainModule { }

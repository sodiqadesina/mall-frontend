import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  category
  constructor(public route: ActivatedRoute, public router: Router, private productsService: ProductService, private cartService: CartService) { }
  products;
  page = 1
  limit = 18
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('category')) {
        this.category = paramMap.get('category')
        console.log(this.category);
        this.productsService.getProductsByCat(this.category).subscribe((res:any)=>{
          console.log(res);
          
          this.products = res.data
        })
        
      }
      else{
        this.productsService.getProductsByPage(this.page,this.limit).subscribe((res:any)=>{
          console.log(res);
          this.products = res.data
        })
      }
    })
  }
  addToCart(details, quantity) {
    this.cartService.addTocart(details,quantity)
  }

}

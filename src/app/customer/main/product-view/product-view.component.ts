import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  slug
  product
  quantity = 1
  categoryProducts;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private productsService: ProductService,
    private cartService: CartService,
     ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('slug')) {
        this.slug = paramMap.get('slug');
        console.log(this.slug);
        this.productsService
          .getProductBySlug(this.slug)
          .subscribe((res: any) => {
            console.log(res);

            this.product = res.data;
            this.getRelatedProducts(this.product.category)
          });
      }
    });
  }
  addToCart(details, quantity?) {
    if (quantity) {
      this.cartService.addTocart(details, quantity)
    }else{
      this.cartService.addTocart(details,this.quantity)
    }
  }
  increaseQuantity() {
    if (this.quantity >= this.product.quantities) {
      return
    }
    this.quantity++
  }
  decreaseQuantity() {
    if (this.quantity == 1) {
      return
    }
    this.quantity--
  }
  getRelatedProducts(category) {
    this.productsService.getProductsByCatLimit(category, 3).subscribe((res:any)=> {
      this.categoryProducts = res.data
    })
  }
}

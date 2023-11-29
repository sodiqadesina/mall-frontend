import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  categories;
  allCategories;
  otherProducts;
  landingCategories = {}
  category1;
  category2;
  productCat1;
  productCat2;
  productCat3;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getCategories()
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data.slice(res.data.length-2).reverse()
      let [category1, category2] = this.categories
      this.category1 = category1
      this.category2 = category2
      console.log(this.categories);
      let num = 0
      this.categories.forEach(category => {
        let product = {}
        this.productService.getProductsByCatLimit(category._id,3).subscribe((res:any)=>{
          this.landingCategories[`${category.name}`] = res.data
          num++
          // product[`${category.name}`] = res.data
          // this.landingCategories.push(product)
          console.log(this.landingCategories, num);
          if (num ===2) {
            this.productCat1 = this.landingCategories[category1.name][0]
            this.productCat2 = this.landingCategories[category2.name][0] // Change this to 2
            console.log(this.productCat2, this.productCat1);
            
          }
        })
        
      });
      this.productService.getProducts().subscribe((res:any)=>{
        console.log(res, this.category1,this.category2);
        this.otherProducts = res.data.filter(product=> product.category!==this.category1._id && product.category!==this.category2._id ).slice(0,3)
        this.productCat3 = this.otherProducts[0]
        console.log(this.otherProducts);
        
      })
    })
  }
  addToCart(details, quantity) {
    this.cartService.addTocart(details,quantity)
  }
}

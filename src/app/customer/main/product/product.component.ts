import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service'
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  categories
  url;
  pageCategory;
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.url = this.router.url.split("/")
    this.pageCategory = this.url[4]
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.url = val.url?.split("/");
        console.log(val.url, this.url);
        this.pageCategory = this.url[4]
      }

    })
    this.getCategories()

  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      console.log(res);

      this.categories = res.data
    })
  }

}

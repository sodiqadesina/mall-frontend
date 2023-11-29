import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  page = 1
  limit = 15
  products
  prev
  next
  categories
  file
  imagePreview
  editPreview = {}
  constructor(
    private productsService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProductsByPage(this.page, this.limit)
    this.getCategories()
  }
  getProductsByPage(page, limit) {
    this.productsService.adminGetProductsByPage(page, limit).subscribe((res: any) => {
      console.log(res);
      this.products = res.data
      this.prev = res.pagination.prev
      this.next = res.pagination.next
    })
  }
  onPrev() {
    this.getProductsByPage(this.prev.page, this.prev.limit)
  }
  onNext() {
    this.getProductsByPage(this.next.page, this.next.limit)
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data
    })
  }
  addProduct(form: NgForm) {
    const value = new FormData()
    value.append('name', form.value.productName)
    value.append('size', form.value.size)
    value.append('description', form.value.description)
    value.append('price', form.value.price)
    value.append('quantities', form.value.quantities)
    value.append('category', form.value.category)
    value.append('image', this.file)
    console.log(value);
    this.productsService.addProduct(value).subscribe(res => {
      console.log(res);
      this.toastr.success("Product added Successfully")
      let div = document.getElementById(`exampleModalCenter`)
      div.click()
      this.ngOnInit()
      this.file = undefined;
      this.imagePreview = undefined;
    })
  }
  onImagePicked(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    console.log(event, this.file);
    if (!this.file.type.startsWith("image")) {
      return this.toastr.error("File must be an Image")
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }
  onImagePickedEdit(event: Event, modalId) {
    this.file = (event.target as HTMLInputElement).files[0];
    console.log(event, this.file);
    if (!this.file.type.startsWith("image")) {
      return this.toastr.error("File must be an Image")
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.editPreview[`${modalId}`] = reader.result;
    };
    reader.readAsDataURL(this.file);
  }
  editProduct(slug, form: NgForm, modalId) {
    console.log(slug, form, modalId);

    if (this.file) {
      const value = new FormData()
      value.append('image', this.file)
      this.productsService.updateProduct(slug,form.value).subscribe(res=>{
        this.productsService.updateProduct(slug,value).subscribe(res => {
          console.log(res);
          this.toastr.success("Product Edited Successfully")
          let div = document.getElementById(`editModal${modalId}`)
          div.click()
          this.ngOnInit()
          this.file = undefined;
          this.imagePreview = undefined;
          this.editPreview = {}
        })
      })
    } else {
      this.productsService.updateProduct(slug, form.value).subscribe(res => {
        console.log(res);
        this.toastr.success("Product Edited Successfully")
        let div = document.getElementById(`editModal${modalId}`)
        div.click()
        this.ngOnInit()
        this.file = undefined;
        this.imagePreview = undefined;
        this.editPreview = {}

      })

    }
  }
}

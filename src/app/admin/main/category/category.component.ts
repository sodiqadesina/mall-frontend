import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  page = 1
  limit = 15
  categories
  prev
  next
  constructor(private categeoryService:CategoryService, private toastr: ToastrService) { 
  }
  
  ngOnInit(): void {
    this.getCategoriesByPage(this.page, this.limit)
  }
  getCategoriesByPage(page,limit) {
    this.categeoryService.getCategoriesByPage(page, limit).subscribe((res:any)=>{
      console.log(res);
      this.categories = res.data
      this.prev = res.pagination.prev
      this.next = res.pagination.next
    })
  }
  onPrev() {
    this.getCategoriesByPage(this.prev.page, this.prev.limit)
  }
  onNext() {
    this.getCategoriesByPage(this.next.page, this.next.limit)
  }
  onSubmit(form, id, modalId) {
    console.log(form);
    
    this.categeoryService.updateCategory(id, {name: form.value.catName}).subscribe(res=>{
      this.toastr.success("Category updated Successfully")
      let div = document.getElementById(`EditModal${modalId}`)
        div.click()
        this.ngOnInit()
    })
  }
  addCategory(form) {
    const value = {
      name: form.value.catName,
      description: form.value.catDesc
    }
    console.log(value);
    this.categeoryService.addCategory(value).subscribe(res=>{
      this.toastr.success("Category added Successfully")
      let div = document.getElementById(`exampleModalCenter`)
        div.click()
        this.ngOnInit()
    })
    
  }

}

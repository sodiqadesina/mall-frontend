import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = environment.api + 'category/'
  constructor(private http: HttpClient, private router: Router,) { }
  getAllCategories() {
    return this.http.get(`${this.api}`)
  }
  getCategoriesByPage(page, limit) {
    return this.http.get(`${this.api}?page=${page}&limit=${limit}`)
  }
  updateCategory(id, value) {
    return this.http.put<any>(`${this.api}${id}`, value)
  }
  addCategory(value) {
    return this.http.post(`${this.api}`, value)
  }

}

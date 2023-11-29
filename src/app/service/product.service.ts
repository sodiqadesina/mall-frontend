import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api = environment.api + 'products/'
  constructor(private http: HttpClient, private router: Router,) { }
  getProductsByCat(category) {
    return this.http.get(`${this.api}?category=${category}&quantities[gt]=0`)
  }
  getProductBySlug(slug) {
    return this.http.get(`${this.api}${slug}`)
  }
  getProductsByCatLimit(category, limit) {
    return this.http.get(`${this.api}?category=${category}&limit=${limit}&quantities[gt]=0`)
  }
  getProducts() {
    return this.http.get(`${this.api}?limit=100&quantities[gt]=0`)
  }
  getProductsByPage(page, limit) {
    return this.http.get(`${this.api}?page=${page}&limit=${limit}&quantities[gt]=0`)
  }
  getAllProducts() {
    return this.http.get(`${this.api}?quantities[gt]=0`)
  }
  adminGetAllProducts() {
    return this.http.get(`${this.api}`)
  }
  adminGetProductsByPage(page,limit) {
    return this.http.get(`${this.api}?page=${page}&limit=${limit}`)
  }
  addProduct(value) {
    return this.http.post(`${this.api}`, value)
  }
  updateProduct(slug, value) {
    return this.http.put(`${this.api}${slug}`, value)
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  api = environment.api + 'order/'
  constructor(private http: HttpClient, private router: Router,) { }
  addOrder(value) {
    return this.http.post<any>(`${this.api}`, value)
  }
  getOrders() {
    return this.http.get(`${this.api}`)
  }
  getOrdersByPage(page, limit) {
    return this.http.get(`${this.api}?page=${page}&limit=${limit}`)
  }
  updateOrder(id, value) {
    return this.http.put<any>(`${this.api}${id}`, value)
  }
  getOrdersById(id) {
    return this.http.get(`${this.api}${id}`)
  }
  getOrdersByPk(pk) {
    return this.http.get(`${this.api}pk/${pk}`)
  }
  getOrdersByUserId(id) {
    return this.http.get(`${this.api}?owner=${id}`)
  }
}

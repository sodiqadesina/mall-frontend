import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.api + 'auth/'
  isAuthenticated = false;
  isAdminAuthenticated = false;
  private userId: string;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  getToken() {
    return this.token;
  }
  getAuth() {
    return this.isAuthenticated;
  }
  getAdminAuth() {
    return this.isAdminAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(Username: string, Password: string) {
    const loginData = { email: Username, password: Password };
    this.http.post(`${this.api}login`, loginData)
      .subscribe((res: any) => {
        // console.log(res);
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresIndur = 3600;
          this.setAuthTimer(expiresIndur);
          this.isAuthenticated = true;
          if (res.role=="admin") {
            this.isAdminAuthenticated = true
          }
          this.userId = res.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIndur * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, res.role);
          this.toastr.success("Login Successful")
          if (res.role=="admin") {
              this.router.navigate(['/admin/main/'])
          }else{
            this.router.navigate(['/']);
          }
        }
      });
  }
  register(name, email, password) {
    const registerData = { name, email, password }
    this.http.post(`${this.api}register`, registerData).subscribe((res: any) => {
      this.toastr.success("Account Created Successfully")
      this.router.navigate(["/login"])
    })
  }
  autoAutUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.Token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      if (authInformation.role == "admin") {
        this.isAdminAuthenticated = true
      }
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
    else {
      this.clearAuthData()
    }

  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date, UserId: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('UserId', UserId);
    localStorage.setItem('role', role);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('UserId');
    localStorage.removeItem('role');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const UserId = localStorage.getItem('UserId');
    const role = localStorage.getItem('role');
    if (!token || !expirationDate) {
      return;
    }
    return {
      Token: token,
      expirationDate: new Date(expirationDate),
      userId: UserId,
      role
    };
  }
  getCurrentUser() {
    return this.http.get(`${this.api}user`)
  }
}

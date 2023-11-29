import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  fieldTextType: boolean;
  constructor(public authService: AuthService) {}
  ngOnInit() {
      this.form = new FormGroup({
          email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
          Password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
      });
  }
  onLogin() {
    console.log("hello");

      if (this.form.invalid) {
          return;
      }
      this.authService.login(this.form.value.email, this.form.value.Password);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}

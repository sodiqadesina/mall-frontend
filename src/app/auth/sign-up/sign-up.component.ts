import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  fieldTextType: boolean;
  constructor(public authService: AuthService, private toastr:ToastrService) { }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      Password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)] }),
      // cPassword: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)] })
    });
  }
  onRegister() {
    if (this.form.invalid) {
      return this.toastr.error("Fields are required")
    }
    // if (this.form.value.Password !== this.form.value.cPassword) {
    //   return this.toastr.error("Password don't match")
    // }
    this.authService.register(this.form.value.name, this.form.value.email, this.form.value.Password)
    // this.authService.login(this.form.value.Username, this.form.value.Password);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}

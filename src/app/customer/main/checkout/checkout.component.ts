import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  currentUser: any = {} 
  loading;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }
  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((res:any)=>{
      this.currentUser = res.data
    })
  }
  onEdit(form: NgForm) {
    this.loading = true
    this.userService.updateUser(this.currentUser._id, this.currentUser).subscribe(res=>{
      this.toastr.success("Profile Updated")
      this.loading = false;
    })
  }

}

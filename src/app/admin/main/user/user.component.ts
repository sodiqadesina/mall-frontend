import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  page = 1
  limit = 15
  users
  prev
  next
  constructor(private usersService: UserService, private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.getUsersByPage(this.page, this.limit)
  }
  getUsersByPage(page, limit) {
    this.usersService.getUsersByPage(page, limit).subscribe((res:any)=>{
      console.log(res);
      
      this.users = res.data
      this.prev = res.pagination.prev
      this.next = res.pagination.next
    })
  }
  onPrev() {
    this.getUsersByPage(this.prev.page, this.prev.limit)
  }
  onNext() {
    this.getUsersByPage(this.next.page, this.next.limit)
  }
  enable(id){
    console.log(id);
    
    this.usersService.updateUser(id, {active: true}).subscribe(res=>{
      this.toastr.success("User Enabled")
      this.ngOnInit()
    })
  }
  disable(id) {
    this.usersService.updateUser(id, {active: false}).subscribe(res=>{
      this.toastr.success("User Disabled")
      this.ngOnInit()
    })
  }

}

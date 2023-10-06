import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { AuthService } from '../service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export interface AdminTable{
  _id:string,
  name:string,
  email:string,
  password:string,
  role:string,
  profileImage:string,
}

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {
  constructor(private service:AuthService,private router:Router,private toastr:ToastrService){}
  

  userArray:AdminTable[] = [];
  ngOnInit() {
    this.service.getUsers().subscribe({
      next:(res:any)=>{
        this.userArray = res.users
        console.log(this.userArray);
        
      },
      error:(error)=>{
        this.toastr.error(error.error.message, 'Error');
      }
    })
  }
  createEmployee() {
    this.router.navigate(['/create'])
    
  }
  edit(id:any) {
    this.router.navigate([`admin/edit/${id}`]) 
  }
  delete(id: any) {
    if (confirm('Are you sure you want to delete')) {
      this.service.deleteUser(id).subscribe({
        next:(res:any) =>{
          this.toastr.success(res.message, 'Success');
        },
        error:(error)=>{
          this.toastr.error(error.error.message, 'Error');
        }
      })
    }
    this.ngOnInit()
  }

}



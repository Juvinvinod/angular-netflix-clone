import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) { }

  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.verifyLogin(this.loginform.value).subscribe(
        {
          next:(res:any)=>{
            localStorage.setItem('token', res.token);
          },
          complete: () => {
            this.toastr.success('Welcome home'),
              this.router.navigate([''])
          },
          error:() =>{
            this.toastr.error('User email/password is incorrect');
          }
        })
    } else {
      this.toastr.error('Invalid credentials');
    }
  }
}

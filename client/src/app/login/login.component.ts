import { Component,OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/login.service';
import { Router } from '@angular/router';
import { UserCredentials } from '../model/User.model';
import { Store } from '@ngrx/store';
import * as LoginPageActions from '../store/auth/login-page.action'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router,private store:Store<{loginAuth:any}>) { }

  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })
   errorMessage = '';
  error$ = this.store.select('loginAuth').subscribe((res)=> {
    this.errorMessage = res.error;
  });
  
  proceedLogin() {
    if (this.loginform.valid) {
      const obj:UserCredentials = {
        email:this.loginform.value.email as string,
        password:this.loginform.value.password as string
      }
      // this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(LoginPageActions.login({userCredentials:obj}));
      
    } else {
      this.toastr.error('Form details invalid', 'Error')
    }
  }
}

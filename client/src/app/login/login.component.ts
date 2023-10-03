import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Usercred } from '../store/model/User.model';
import { beginLogin } from '../store/user.action';
import { Store } from '@ngrx/store';
import { showAlert } from '../store/common/app.action';
import { setLoadingSpinner } from '../store/shared/shared.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router,private store:Store) { }

  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedlogin() {
    if (this.loginform.valid) {
      const obj:Usercred = {
        email:this.loginform.value.email as string,
        password:this.loginform.value.password as string
      }
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(beginLogin({
        userCred:obj
      }))
    } else {
      this.store.dispatch(showAlert({message:'Form details invalid',resultType:'fail'}))
    }
  }
}

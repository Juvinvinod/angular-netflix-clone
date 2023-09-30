import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { showAlert } from '../store/common/app.action';
import { Users } from '../store/model/User.model';
import { beginRegister } from '../store/user.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router,private store:Store) { }

  registerform = this.builder.group({
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
  })

  proceedregistration() {
    if (this.registerform.valid) {
      // this.service.proceedRegister(this.registerform.value).subscribe((res: any) => {
      //   localStorage.setItem('token', res.token);
      //   this.toastr.success('Registered successfully');
      //   this.router.navigate(['login'])
      // })
      const userObj:Users = {
        name:this.registerform.value.name as string,
        email:this.registerform.value.email as string,
        password:this.registerform.value.password as string
      }
      this.store.dispatch(beginRegister({userData:userObj}))
    } else {
      this.store.dispatch(showAlert({message:'Form details invalid',resultType:'fail'}))
    }
  }

}

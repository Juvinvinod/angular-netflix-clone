import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { showAlert } from '../store/common/app.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router, private store: Store) { }

  registerForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
  })

  proceedRegistration() {
    if (this.registerForm.valid) {
      const userObj = {
        name: this.registerForm.value.name as string,
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string
      }
      this.service.proceedRegister(userObj).subscribe({
        next: (res) => {
          this.toastr.success('Registered successfully')
          this.router.navigate(['login'])
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Registration failed')
        }
      })
    } else {
      this.toastr.error('Form details invalid', 'Registration failed')
    }
  }

}

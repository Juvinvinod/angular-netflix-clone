import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/login.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(private router: Router, private service: AuthService, private toastr: ToastrService, private route: ActivatedRoute) { }
  data = {
    name: '',
    email: ''
  }
  id: any
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id', this.id);
    if (this.id) {
      this.service.getUser(this.id).subscribe({
        next: (res: any) => this.data = res,
        error: (error) => this.toastr.error(error.error.message, 'Error')
      })
    }

  }
  onSubmit(value: any) {
    console.log({ value })

    this.service.updateUser(this.data).subscribe({
      next: (res) => {
        this.router.navigate(['admin'])
        this.toastr.success("user updated", 'Success')
      },
      error: (error) => this.toastr.error(error.error.message, 'Error')
    })

  }
}





// (res) => {
//   if (res.success === 1) {
//     this.toastr.success(res.message, 'Success', {
//   timeOut: 5000,
//     });
//     this.router.navigate(['/'])
//   } else {
//       this.toastr.error(res.message, 'error', {
//   timeOut: 5000,
//   });
//   }
// }, (err) => {
//      this.toastr.error(err, 'Http issue', {
//   timeOut: 5000,
//   });
// }
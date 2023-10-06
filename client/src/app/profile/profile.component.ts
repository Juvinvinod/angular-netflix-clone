import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  baseURL = "http://localhost:3000/";
  databaseURL = "person.jpg";
  imageURL = this.baseURL + this.databaseURL;
  name: string = '';
  email:string = '';
  fileName = '';
  constructor(private service:AuthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event:any) {

    const file:File = event.target.files[0];
    

    if (file) {
        this.fileName = file.name;

        let formData = new FormData();

        formData.append("thumbnail", file);
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        
        
        const upload$ = this.service.imageUpload(formData)
        upload$.subscribe({
          next:(res)=> this.toastr.success('Image uploaded', 'Success')
        })
    }
  }

}


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  name:string = '';
  constructor(private service:AuthService, private router:Router){}
  ngOnInit(): void {
    this.service.getHome().subscribe( 
      (res: any[]) => {
        this.name = res[0].name; 
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['login']);
          }
        }
      }
    );
  }
}

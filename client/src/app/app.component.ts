import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  showLoading:any;
  constructor(public service: AuthService, private router: Router, private store:Store<{loader:boolean}>){
    
  }
  
  ngOnInit(): void {
   this.store.select('loader').subscribe((res:any)=>{
    this.showLoading =res.showLoading
   });    
  }
}

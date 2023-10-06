import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as LoginPageActions from './store/auth/login-page.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  showLoading:any;
  constructor(public service: AuthService, private router: Router, private store:Store){
    
  }
  
  ngOnInit(): void {
    // this.store.dispatch(LoginPageActions.autoLogin())
  //  this.store.select('loader').subscribe((res:any)=>{
  //   this.showLoading =res.showLoading
  //  });    
  }
}

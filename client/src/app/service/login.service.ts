import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import * as LoginPageActions from '../store/auth/login-page.action'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router:Router,private cookieService: CookieService,private store:Store) { }
  apiURL = 'http://localhost:3000'
  adminAPI = 'http://localhost:3000/admin'

  getAll() {
    return this.http.get(this.apiURL);
  }

  // getByCode(code: any) {
  //   return this.http.get(this.apiURL + '/' + code);
  // }

  verifyLogin(inputData: any) {
    return this.http.post(this.apiURL + '/' + 'login', inputData);
  }

  proceedRegister(inputData: any) {
    return this.http.post(this.apiURL + '/' + 'register', inputData);
  }

  updateUser(inputData: any) {
    return this.http.put(this.adminAPI + '/' + 'edit', inputData);
  }

  loggedIn() {
    const token = this.cookieService.get('user');
    if(token){
      return true;
    }
    return false;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getHome(): Observable<any>{
    return this.http.get(this.apiURL);
  }

  getUsers(){
    return this.http.get(this.adminAPI + '/' + 'users')
  }

  

  getUser(id:any){
    return this.http.get(this.adminAPI + '/' + 'user'+ '/' + id)
  }

  deleteUser(id:any){
    return this.http.delete(this.adminAPI + '/' + 'delete' + '/' + id)
  }

  logoutUser(){
    this.cookieService.delete('user');
    this.store.dispatch(LoginPageActions.logout())
   }

   checkAdmin(){
    const role = this.cookieService.get('role');
    if(role === 'user'){
      return false;
    }else{
      return true;
    }
   }

   imageUpload(data:any){
    return this.http.post(this.apiURL + '/' + 'image',data)
   }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiURL = 'http://localhost:3000'

  getAll() {
    return this.http.get(this.apiURL);
  }

  getByCode(code: any) {
    return this.http.get(this.apiURL + '/' + code);
  }

  verifyLogin(inputData: any) {
    return this.http.post(this.apiURL + '/' + 'login', inputData);
  }

  proceedRegister(inputData: any) {
    return this.http.post(this.apiURL + '/' + 'register', inputData);
  }

  updateUser(code: any, inputData: any) {
    return this.http.put(this.apiURL + '/' + code, inputData);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getHome(): Observable<any>{
    return this.http.get(this.apiURL);
  }
}

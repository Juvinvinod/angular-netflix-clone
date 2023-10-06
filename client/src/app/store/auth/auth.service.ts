import { Injectable } from '@angular/core';
import { User, UserCredentials } from 'src/app/model/User.model';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    apiURL = 'http://localhost:3000'
    constructor(private http: HttpClient, private cookieService: CookieService,private store:Store<{loginAuth:any}>) { }

    login({ email, password }: UserCredentials): Observable<User> {
        return this.http.post<User>(this.apiURL + '/' + 'login', { email, password }).pipe(
            map((res: any): User => ({
                name: '',
                email: '',
                password: '',
                token: res.token,
                role:res.role,
            })),)
    }

    

//     autoLogin() {
//         const token = this.cookieService.get('user');
//         let user;
//         let value = '';
//   let details = this.store.select('loginAuth').subscribe((res)=> {
//     value = res.token;
//   });
//   console.log(value);
//   console.log(token);
  
//         if (token && !value) {
//             user = {
//                 name: '',
//                 email: '',
//                 password: '',
//                 token: token,
//             }
//         }else{
//             throw Error("No login")
//         }
//         return user;
//     }
}
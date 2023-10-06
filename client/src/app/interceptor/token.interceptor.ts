import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/login.service';
import { Store } from '@ngrx/store';
import { User } from '../model/User.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<{ auth: User }>, private cookieService: CookieService) {
  }
 
   token = this.cookieService.get('user');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authService: AuthService = inject(AuthService)
    const tokenizedReq = request.clone({ setHeaders: { Authorization: 'Bearer ' + `${this.token}` } })
    return next.handle(tokenizedReq);
  }
}

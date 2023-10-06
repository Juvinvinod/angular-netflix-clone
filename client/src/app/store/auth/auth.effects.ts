import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LoginPageActions from '../auth/login-page.action'
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { User, UserCredentials } from "src/app/model/User.model";
import { AuthService } from "./auth.service";
import * as AuthApiActions from '../auth/auth-api.actions';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AuthEffects {
  constructor(private action$: Actions, private router: Router, private authService: AuthService, private cookieService: CookieService) { }

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.userCredentials),
      exhaustMap((auth: UserCredentials) =>
        this.authService.login(auth).pipe(
          map((user: User) => {
            this.cookieService.set('user', `${user.token}`)
            this.cookieService.set('role', `${user.role}`)
            return AuthApiActions.loginSuccess({ user })
          }),
          catchError((error) => of(AuthApiActions.loginFailure({ error: 'Login Failed' })))
        )
      )
    )
  );

  loginSuccess = createEffect(() =>
    this.action$.pipe(
      ofType(AuthApiActions.loginSuccess),
      map(() => {
        return AuthApiActions.loginRedirect()
      })
    )
  )

  loginRedirect = createEffect(() =>
    this.action$.pipe(
      ofType(AuthApiActions.loginRedirect),
      tap(() => {
        this.router.navigate([''])
      })
    ), { dispatch: false }
  )

  // loginAuto$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(LoginPageActions.autoLogin),
  //     map(() => {
  //       try {
  //         const user:any = this.authService.autoLogin()
  //          return AuthApiActions.loginSuccess({ user })

  //       } catch (error) {
  //         return AuthApiActions.loginFailure({error:""})
  //       }
  //     })
  //   )
  // )

  loginFailure = createEffect(() =>
    this.action$.pipe(
      ofType(AuthApiActions.loginFailure),
      tap(() => {
        this.router.navigate(["login"])
      })
    ), { dispatch: false }
  )

  logOut = createEffect(() =>
    this.action$.pipe(
      ofType(LoginPageActions.logout),
      tap(() => {
        this.router.navigate(["login"])
      })
    ), { dispatch: false }
  )
}


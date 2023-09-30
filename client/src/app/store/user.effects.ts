import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../service/auth.service";
import { beginLogin, beginRegister } from "./user.action";
import {exhaustMap,map,catchError,of} from 'rxjs'
import { Router } from "@angular/router";
import { showAlert } from "./common/app.action";

@Injectable()
export class UserEffect {
    constructor(private action$: Actions, private service: AuthService,private router:Router) { }

    userRegister = createEffect(()=>
        this.action$.pipe(
            ofType(beginRegister),
            exhaustMap((action)=>{
                return this.service.proceedRegister(action.userData).pipe(
                    map(()=>{
                        this.router.navigate(['login'])
                        return showAlert ({message:'Registered successfully',resultType:'Pass'})
                    }),
                    catchError((error)=>of(showAlert({message:'Registration failed due to :'+ error.message,resultType: 'fail'})))
                )
            })
        )
    )

    userLogin = createEffect(()=>
        this.action$.pipe(
            ofType(beginLogin),
            exhaustMap((action)=>{
                return this.service.verifyLogin(action.userCred).pipe(
                    map((data:any)=>{
                        localStorage.setItem('token', data.token);
                        this.router.navigate([''])
                        return showAlert ({message:'Welcome home',resultType:'Pass'})
                    }),
                    catchError((error)=>of(showAlert({message:'Registration failed due to :'+ error.message,resultType: 'fail'})))
                )
            })
        )
    )
}

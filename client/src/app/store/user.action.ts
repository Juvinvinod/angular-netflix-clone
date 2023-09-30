import { createAction, props } from "@ngrx/store"
import { Usercred, Users } from "./model/User.model"

export const BEGIN_REGISTER = '[auth] begin register'
export const BEGIN_LOGIN = '[auth] begin login'

export const beginRegister = createAction(BEGIN_REGISTER,props<{userData:Users}>())
export const beginLogin = createAction(BEGIN_LOGIN,props<({userCred: Usercred})>())
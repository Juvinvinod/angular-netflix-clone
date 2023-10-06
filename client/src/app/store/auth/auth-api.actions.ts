import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/User.model";

export const loginSuccess = createAction('[auth/api login success]',props<{user:User}>());
export const loginFailure = createAction('[auth/api login failure]',props<{error:any}>());
export const loginRedirect = createAction('[auth/api login redirect]');

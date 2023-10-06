import { createAction, props } from "@ngrx/store";
import { UserCredentials } from "src/app/model/User.model";

export const login = createAction('[login page] login',props<{userCredentials:UserCredentials}>());
export const autoLogin = createAction('[login page] auto login');
export const logout = createAction('[login page] logout');
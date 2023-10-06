import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/User.model";
import * as AuthApiActions from '../auth/auth-api.actions';
import * as AuthActions from '../auth/auth.actions';

export interface State {
    user: User | null;
}

export const initialState: State = {
    user: null,
}

export const AuthReducer = createReducer(
    initialState,
    on(AuthApiActions.loginSuccess, (state, { user }) => {
        return {
            ...state,
            user
        }
    }),
    on(AuthActions.logout, () => {
        return initialState
    })
);

export const getUser = (state:State) => state.user;


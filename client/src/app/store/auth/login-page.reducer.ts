import { createReducer, on } from "@ngrx/store"
import * as LoginPageActions from '../auth/login-page.action'
import * as AuthApiActions from '../auth/auth-api.actions'

export interface State {
    error: string | null,
    pending: boolean
}

export const initialState: State = {
    error: null,
    pending: false,
}

export const loginReducer = createReducer(initialState,
    on(LoginPageActions.login, (state) => {
        return {
            ...state,
            error: null,
            pending: true,
        }
    }),
    on(AuthApiActions.loginSuccess, (state) => {
        return {
            ...state,
            error: null,
            pending: false,
        }
    }),
    on(AuthApiActions.loginFailure, (state, { error }) => {
        return {
            ...state,
            error: error,
            pending: false,
        }
    })
);

export const getError = (state:State) => state.error;
export const getPending = (state:State) => state.pending;

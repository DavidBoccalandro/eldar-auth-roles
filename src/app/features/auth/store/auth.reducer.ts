import { createReducer, on } from '@ngrx/store';
import { LoginActions } from './actions/login.actions';
import { AuthState } from './auth.store.model';

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,

  on(LoginActions.loadAuthState, (state, { token, user }) => {
    return { ...state, token, user, isLoading: false };
  }),

  on(LoginActions.loginInit, (state) => ({ ...state, isLoading: true })),

  on(LoginActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isLoading: false,
    error: null,
  })),

  on(LoginActions.loginFailed, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);

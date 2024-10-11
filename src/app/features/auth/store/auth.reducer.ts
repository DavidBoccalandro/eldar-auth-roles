import { createReducer, on } from '@ngrx/store';
import { LoginActions } from './actions/login.actions';
import { AuthState } from './auth.model';

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(LoginActions.loginInit, (state) => ({ ...state, isLoading: true })),

  on(LoginActions.loginSuccessful, (state, { user, token }) => ({
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
  })),

  on(LoginActions.loadAuthState, (state, { token }) => ({
    ...state,
    token,
    isLoading: false,
  }))
);

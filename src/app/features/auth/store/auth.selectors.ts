import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.store.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.token
);

export const selectUserRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.role
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectLoginError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

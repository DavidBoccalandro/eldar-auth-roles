import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoginActions } from './actions/login.actions';

@Injectable()
export class AuthEffects {
  loadAuthState$ = createEffect(() =>
    of(this.authService.getToken()).pipe(
      map((token) => LoginActions.loadAuthState({ token }))
    )
  );

  loginInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginInit),
      switchMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map((response) => {
            const user: User = {
              id: response.userId,
              username: response.username,
              role: response.role,
            };
            const token = response.token;
            return LoginActions.loginSuccessful({ user, token });
          }),
          catchError((error) =>
            of(LoginActions.loginFailed({ error: error.message }))
          )
        );
      })
    )
  );

  $loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.loginSuccessful),
        tap(({ token }) => {
          this.authService.setToken(token);
          this.router.navigate(['/posts']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}
}

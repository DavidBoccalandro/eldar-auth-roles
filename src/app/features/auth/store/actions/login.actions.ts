import { createActionGroup, props } from '@ngrx/store';

export const LoginActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ username: string; password: string }>(),
    'Login Successful': props<{ token: string }>(),
    'Login Failed': props<{ error: string }>(),
  },
});

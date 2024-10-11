import { createActionGroup, props } from '@ngrx/store';
import { User } from '../auth.model';

export const LoginActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ username: string; password: string }>(),
    'Login Successful': props<{ user: User; token: string }>(),
    'Login Failed': props<{ error: string }>(),
  },
});

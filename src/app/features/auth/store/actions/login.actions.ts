import { User } from '@app/shared/models/user.model';
import { createActionGroup, props } from '@ngrx/store';

export const LoginActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auth State': props<{ token: string | null }>(),

    'Login Init': props<{ username: string; password: string }>(),
    'Login Successful': props<{ user: User; token: string }>(),
    'Login Failed': props<{ error: string }>(),
  },
});

import { User } from '@app/shared/models/user.model';
import { createActionGroup, props } from '@ngrx/store';

export const LoginActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auth State': props<{ token: string | null; user: User | null }>(),

    'Login Init': props<{ username: string; password: string }>(),
    'Login Success': props<{ user: User; token: string }>(),
    'Login Failed': props<{ error: string }>(),
  },
});

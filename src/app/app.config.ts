import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { AuthEffects } from './features/auth/store/auth.effects';
import { authReducer } from './features/auth/store/auth.reducer';
import { postsReducer } from './features/posts/store/posts.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ auth: authReducer, posts: postsReducer }),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(),
  ],
};

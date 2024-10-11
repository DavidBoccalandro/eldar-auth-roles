import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { NonAuthGuard } from './features/auth/guards/non-auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { PostsListComponent } from './features/posts/posts-list/posts-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];

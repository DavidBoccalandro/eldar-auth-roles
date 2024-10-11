import { Routes } from '@angular/router';
import { AdminGuard } from './features/auth/guards/admin.guard';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { NonAuthGuard } from './features/auth/guards/non-auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { CreatePostComponent } from './features/posts/create-post/create-post.component';
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
  {
    path: 'posts/create',
    component: CreatePostComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: '**', redirectTo: '/login' },
];

import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { PostsListComponent } from './features/posts/posts-list/posts-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'posts', component: PostsListComponent },
];

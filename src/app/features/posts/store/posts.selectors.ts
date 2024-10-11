import { createFeatureSelector } from '@ngrx/store';
import { PostsState } from './posts.store.model';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

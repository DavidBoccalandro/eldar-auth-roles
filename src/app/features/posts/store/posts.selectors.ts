import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.store.model';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectAllPosts = createSelector(
  selectPostsState,
  (state: PostsState) => state.postsList
);

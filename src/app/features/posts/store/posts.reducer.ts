import { Post } from '@app/shared/models/post.model';
import { createReducer } from '@ngrx/store';
import { PostsState } from './posts.store.model';

const initialState: PostsState = {
  postsList: [] as Post[],
};

export const postsReducer = createReducer(initialState);

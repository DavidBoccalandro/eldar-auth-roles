import { createReducer, on } from '@ngrx/store';
import { PostsActions } from './actions/posts.actions';
import { PostsState } from './posts.store.model';

const initialState: PostsState = {
  postsList: [],
};

export const postsReducer = createReducer(
  initialState,

  on(PostsActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    postsList: posts,
  })),

  on(PostsActions.createPostSuccess, (state, { post }) => ({
    ...state,
    postsList: [post, ...state.postsList],
  })),

  on(PostsActions.deletePostSuccess, (state, { postId }) => ({
    ...state,
    postsList: state.postsList.filter((post) => post.id !== postId),
  }))
);

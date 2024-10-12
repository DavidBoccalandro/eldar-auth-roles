import { Post } from '@app/shared/models/post.model';
import { createReducer, on } from '@ngrx/store';
import { PostsActions } from './actions/posts.actions';
import { PostsState } from './posts.store.model';

const initialState: PostsState = {
  postsList: [] as Post[],
  currentPost: {} as Post,
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
    postsList: state.postsList.filter((p) => p.id !== postId),
  })),

  on(PostsActions.loadPostForEdit, (state, { post }) => ({
    ...state,
    currentPost: post,
  })),

  on(PostsActions.editPostSuccess, (state, { post }) => ({
    ...state,
    postsList: state.postsList.map((p) => (p.id === post.id ? post : p)),
    currentPost: {} as Post,
  })),

  on(
    PostsActions.addFavorite,
    PostsActions.removeFavorite,
    (state, { postId }) => ({
      ...state,
      postsList: state.postsList.map((p) =>
        p.id === postId ? { ...p, isFavorite: !p.isFavorite } : { ...p }
      ),
    })
  )
);

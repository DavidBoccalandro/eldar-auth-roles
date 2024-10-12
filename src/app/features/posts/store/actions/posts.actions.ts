import { Post } from '@app/shared/models/post.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failed': props<{ error: string }>(),

    'Create Post': props<{ post: Post }>(),
    'Create Post Success': props<{ post: Post }>(),
    'Create Post Failed': props<{ error: string }>(),

    'Open Delete Modal': props<{ post: Post }>(),

    'Delete Post': props<{ postId: number }>(),
    'Delete Post Success': props<{ postId: number }>(),
    'Delete Post Failed': props<{ error: string }>(),
  },
});

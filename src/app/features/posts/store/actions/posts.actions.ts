import { Post } from '@app/shared/models/post.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failed': props<{ error: string }>(),
  },
});

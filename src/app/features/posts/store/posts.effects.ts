import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { PostsActions } from './actions/posts.actions';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      switchMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return PostsActions.loadPostsSuccess({ posts });
          }),
          catchError((error) => {
            return of(PostsActions.loadPostsFailed({ error: error.message }));
          })
        );
      })
    )
  );
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { PostsActions } from './actions/posts.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private messageService: MessageService,
    private router: Router
  ) {}

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

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPost),
      switchMap(({ post }) => {
        return this.postsService.createPost(post).pipe(
          map((createdPost) =>
            PostsActions.createPostSuccess({ post: createdPost })
          ),
          catchError((error) =>
            of(PostsActions.createPostFailed({ error: error.message }))
          )
        );
      })
    )
  );

  createPostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.createPostSuccess),
        tap(() => {
          this.router.navigate(['/posts']);
          this.messageService.add({
            severity: 'success',
            summary: 'Publicación creada con éxito',
            detail: 'La publicación se ha creado correctamente',
          });
        })
      ),
    { dispatch: false }
  );
}

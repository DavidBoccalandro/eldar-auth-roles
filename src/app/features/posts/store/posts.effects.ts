import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared/services/modal.service';
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
    private router: Router,
    private modalService: ModalService
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

  openDeleteConfirmationModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.openDeleteModal),
        tap(({ post }) => {
          this.modalService.openModal(
            'Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar el post: ${post.title}?`,
            () => {
              console.log('Post eliminado:', post);
            }
          );
        })
      ),
    { dispatch: false }
  );
}

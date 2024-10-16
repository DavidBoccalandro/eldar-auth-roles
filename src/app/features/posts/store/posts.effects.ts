import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared/services/modal.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { PostsActions } from './actions/posts.actions';
import { LoadingService } from '@app/shared/services/loading.service';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private postsService: PostsService,
    private messageService: MessageService,
    private router: Router,
    private modalService: ModalService,
    private loadingService: LoadingService
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      switchMap(() => {
        this.loadingService.startLoading();
        return this.postsService.getPosts().pipe(
          map((posts) => {
            this.loadingService.stopLoading();
            return PostsActions.loadPostsSuccess({ posts });
          }),
          catchError((error) => {
            this.loadingService.stopLoading();
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

  loadPostForEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.loadPostForEdit),
        tap(({ post }) => {
          this.router.navigate(['/posts/edit', post.id]);
        })
      ),
    { dispatch: false }
  );

  editPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.editPost),
      switchMap(({ post }) => {
        return this.postsService.updatePost(post.id, post).pipe(
          map((updatedPost) =>
            PostsActions.editPostSuccess({ post: updatedPost })
          ),
          catchError((error) =>
            of(PostsActions.editPostFailed({ error: error.message }))
          )
        );
      })
    )
  );

  editPostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.editPostSuccess),
        tap(() => {
          this.router.navigate(['/posts']);
          this.messageService.add({
            severity: 'success',
            summary: 'Publicación editada con éxito',
            detail: 'La publicación se ha editado correctamente.',
          });
        })
      ),
    { dispatch: false }
  );

  openDeleteModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.openDeleteModal),
        tap(({ post }) => {
          this.modalService.openModal(
            'Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar el post: ${post.title}?`,
            () =>
              this.store.dispatch(PostsActions.deletePost({ postId: post.id }))
          );
        })
      ),
    { dispatch: false }
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost),
      switchMap(({ postId }) => {
        return this.postsService.deletePost(postId).pipe(
          map(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Post eliminado',
              detail: 'El post se ha eliminado correctamente.',
            });
            return PostsActions.deletePostSuccess({ postId });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el post.',
            });
            return of(PostsActions.deletePostFailed({ error: error.message }));
          })
        );
      })
    )
  );

  addFavoriteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.addFavorite),
        tap(({ postId }) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Agregado a favoritos',
            detail: `El post con ID ${postId} ahora es uno de tus favoritos y se encuentra en la parte superior de la lista.`,
          });
        })
      ),
    { dispatch: false }
  );

  removeFavoriteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.removeFavorite),
        tap(({ postId }) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Eliminado de favoritos',
            detail: `El post con ID ${postId} ya no es uno de tus favoritos y se encuentra en su posición original en la lista.`,
          });
        })
      ),
    { dispatch: false }
  );
}

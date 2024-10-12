import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { selectUserRole } from '@app/features/auth/store/auth.selectors';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { Post } from '@app/shared/models/post.model';
import { UserRole } from '@app/shared/models/user.model';
import { LoadingService } from '@app/shared/services/loading.service';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { PostsActions } from '../store/actions/posts.actions';
import { selectAllPosts } from '../store/posts.selectors';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ModalComponent,
    InputTextModule,
    InputTextareaModule,
    SpinnerComponent,
  ],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts$!: Observable<Post[]>;
  userRole$!: Observable<UserRole | undefined>;
  UserRoleEnum = UserRole;
  isLoading: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.posts$ = this.store.select(selectAllPosts);

    this.posts$.pipe(take(1)).subscribe((posts) => {
      if (!posts || posts.length === 0) {
        this.store.dispatch(PostsActions.loadPosts());
      }
    });

    this.userRole$ = this.store.select(selectUserRole);

    this.loadingService.loadingSub
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoading = loading;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editPost(post: Post) {
    this.store.dispatch(PostsActions.loadPostForEdit({ post }));
  }

  deletePost(post: Post) {
    this.store.dispatch(PostsActions.openDeleteModal({ post }));
  }

  createPost() {
    this.router.navigate(['/posts/create']);
  }
}

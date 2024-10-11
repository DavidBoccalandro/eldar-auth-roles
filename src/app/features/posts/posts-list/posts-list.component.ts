import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { selectUserRole } from '@app/features/auth/store/auth.selectors';
import { Post } from '@app/shared/models/post.model';
import { UserRole } from '@app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { PostsActions } from '../store/actions/posts.actions';
import { selectAllPosts } from '../store/posts.selectors';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  userRole$!: Observable<UserRole | undefined>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(PostsActions.loadPosts());

    this.posts$ = this.store.select(selectAllPosts);
    this.userRole$ = this.store.select(selectUserRole);
  }

  editPost(post: Post) {
    console.log(post);
  }

  deletePost(post: Post) {
    console.log(post);
  }

  createPost() {
    console.log('create');
  }
}

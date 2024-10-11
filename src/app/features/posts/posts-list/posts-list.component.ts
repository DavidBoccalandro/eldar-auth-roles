import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '@app/features/posts/services/posts.service';
import { Post } from '@app/shared/models/post';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { UserRole } from '../../auth/store/auth.model';
import { selectUserRole } from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  userRole$!: Observable<UserRole | undefined>;

  constructor(private postsService: PostsService, private store: Store) {}

  ngOnInit() {
    this.loadPosts();

    this.userRole$ = this.store.select(selectUserRole);
  }

  loadPosts() {
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      },
    });
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

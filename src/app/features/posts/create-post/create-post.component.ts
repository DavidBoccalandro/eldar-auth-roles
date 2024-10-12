import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@app/shared/models/post.model';
import { Store } from '@ngrx/store';
import { PostMode } from '../enums/post-mode.enum';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostsActions } from '../store/actions/posts.actions';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [PostFormComponent],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  postModeEnum = PostMode;
  isLoading: boolean = false;

  constructor(private store: Store, private router: Router) {}

  createPost(post: Post) {
    this.isLoading = true
    this.store.dispatch(PostsActions.createPost({ post }));
  }

  goBack() {
    this.router.navigate(['/posts']);
  }
}

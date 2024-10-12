import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@app/shared/models/post.model';
import { Store } from '@ngrx/store';
import { PostMode } from '../enums/post-mode.enum';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostsActions } from '../store/actions/posts.actions';
import { selectCurrentPost } from '../store/posts.selectors';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [PostFormComponent, CommonModule],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent {
  currentPost$ = this.store.select(selectCurrentPost);
  postModeEnum = PostMode;

  constructor(private store: Store, private router: Router) {}

  editPost(post: Post) {
    this.store.dispatch(PostsActions.editPost({ post }));
  }

  goBack() {
    this.router.navigate(['/posts']);
  }
}

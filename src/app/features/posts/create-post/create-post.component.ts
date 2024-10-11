import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PostsActions } from '../store/actions/posts.actions';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const newPost = {
        id: 0,
        title: this.postForm.value.title,
        body: this.postForm.value.body,
        userId: 1,
      };
      this.store.dispatch(PostsActions.createPost({ post: newPost }));
    }
  }
}

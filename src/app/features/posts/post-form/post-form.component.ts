import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post } from '@app/shared/models/post.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PostMode } from '../enums/post-mode.enum';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
  @Input() post!: Post;
  @Input() mode!: PostMode;
  @Input() isLoading: boolean = false;

  @Output() submitted = new EventEmitter<Post>();
  @Output() cancelled = new EventEmitter<void>();

  postForm: FormGroup;
  postModeEnum = PostMode;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    if (this.post) {
      this.postForm.patchValue(this.post);
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      const postData = {
        id: this.mode === this.postModeEnum.Edit ? this.post.id : 0,
        title: this.postForm.value.title,
        body: this.postForm.value.body,
        userId: this.post ? this.post.userId : 1,
      };
      this.submitted.emit(postData);
    }
  }

  onCancel() {
    this.cancelled.emit();
  }
}

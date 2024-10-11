import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}
}

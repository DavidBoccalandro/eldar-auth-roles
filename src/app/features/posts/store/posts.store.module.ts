import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PostsEffects } from './posts.effects';
import { postsReducer } from './posts.reducer';
@NgModule({
  imports: [
    StoreModule.forFeature('posts', postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsStoreModule {}

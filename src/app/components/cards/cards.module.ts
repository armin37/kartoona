import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EpisodeCardComponent} from './episode-card/episode-card.component';
import {CommentCardComponent} from './comment-card/comment-card.component';
import {PostWideCardComponent} from './post-wide-card/post-wide-card.component';
import {PostSmallCardComponent} from './post-small-card/post-small-card.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    EpisodeCardComponent,
    CommentCardComponent,
    PostWideCardComponent,
    PostSmallCardComponent
  ],
  exports: [
    EpisodeCardComponent,
    CommentCardComponent,
    PostWideCardComponent,
    PostSmallCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ]
})
export class CardsModule {
}

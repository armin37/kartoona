import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoImageTopCardComponent} from './info-image-top-card/info-image-top-card.component';
import {InfoImageFadingCardComponent} from './info-image-fading-card/info-image-fading-card.component';
import {InfoImageRightCardComponent} from './info-image-right-card/info-image-right-card.component';
import {RouterModule} from '@angular/router';
import {InfoFullWidthCardComponent} from './info-full-width-card/info-full-width-card.component';

@NgModule({
  declarations: [
    InfoImageTopCardComponent,
    InfoImageFadingCardComponent,
    InfoImageRightCardComponent,
    InfoFullWidthCardComponent,
  ],
  exports: [
    InfoImageTopCardComponent,
    InfoImageFadingCardComponent,
    InfoImageRightCardComponent,
    InfoFullWidthCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SlidersCardsModule {
}

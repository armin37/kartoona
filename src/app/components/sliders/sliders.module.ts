import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwiperModule} from 'swiper/angular';
import {ArrowSliderComponent} from './arrow-slider/arrow-slider.component';
import {CardsModule} from '../cards/cards.module';
import {PostSliderComponent} from './post-slider/post-slider.component';
import {RouterModule} from '@angular/router';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  declarations: [
    PostSliderComponent,
  ],
  exports: [
    PostSliderComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    CardsModule,
    RouterModule,
    LazyLoadImageModule
  ]
})
export class SlidersModule {
}

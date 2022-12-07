import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullSliderComponent} from './full-slider/full-slider.component';
import {SwiperModule} from 'swiper/angular';
import {ArrowSliderComponent} from './arrow-slider/arrow-slider.component';
import {RouterModule} from '@angular/router';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {SlidersCardsModule} from '../cards/slider-cards.module';

@NgModule({
  declarations: [
    FullSliderComponent,
    ArrowSliderComponent,
  ],
  exports: [
    FullSliderComponent,
    ArrowSliderComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    LazyLoadImageModule,
    SlidersCardsModule
  ]
})
export class HomeSlidersModule {
}

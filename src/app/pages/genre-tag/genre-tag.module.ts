import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GenreTagRoutingModule} from './genre-tag-routing.module';
import {GenreTagComponent} from './genre-tag.component';
import {HeadersModule} from '../../components/headers/headers.module';
import {SlidersModule} from '../../components/sliders/sliders.module';
import {CardsModule} from '../../components/cards/cards.module';
import {GeneralModule} from '../../components/general/general.module';


@NgModule({
  declarations: [GenreTagComponent],
  imports: [
    CommonModule,
    GenreTagRoutingModule,
    HeadersModule,
    SlidersModule,
    CardsModule,
    GeneralModule
  ]
})
export class GenreTagModule {
}

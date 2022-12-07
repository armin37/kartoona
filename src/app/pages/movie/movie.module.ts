import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { HeadersModule } from '../../components/headers/headers.module';
import { CardsModule } from '../../components/cards/cards.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlidersModule } from 'src/app/components/sliders/sliders.module';
import { RatingModule } from 'primeng/rating';
import {GeneralModule} from '../../components/general/general.module';
import {PipesModule} from '../../pipes/pipes.module';
import {HomeSlidersModule} from '../../components/sliders/home-sliders.module';
import {VideoPlayerModule} from '../../components/video-player/video-player.module';

@NgModule({
  declarations: [MovieComponent],
    imports: [
        CommonModule,
        HeadersModule,
        CardsModule,
        MovieRoutingModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        SlidersModule,
        RatingModule,
        GeneralModule,
        PipesModule,
        HomeSlidersModule,
        VideoPlayerModule,
    ]
})
export class MovieModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreComponent } from './genre.component';
import { HeadersModule } from 'src/app/components/headers/headers.module';
import {GeneralModule} from '../../components/general/general.module';
import {SlidersCardsModule} from '../../components/cards/slider-cards.module';


@NgModule({
  declarations: [GenreComponent],
    imports: [
        CommonModule,
        GenreRoutingModule,
        HeadersModule,
        GeneralModule,
        SlidersCardsModule
    ]
})
export class GenreModule { }

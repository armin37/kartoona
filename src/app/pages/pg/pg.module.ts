import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PgRoutingModule } from './pg-routing.module';
import { PgComponent } from './pg.component';
import { HeadersModule } from 'src/app/components/headers/headers.module';
import { CardsModule } from 'src/app/components/cards/cards.module';
import {GeneralModule} from '../../components/general/general.module';
import {SlidersCardsModule} from '../../components/cards/slider-cards.module';


@NgModule({
  declarations: [PgComponent],
    imports: [
        CommonModule,
        PgRoutingModule,
        HeadersModule,
        CardsModule,
        GeneralModule,
        SlidersCardsModule,
    ]
})
export class PgModule { }

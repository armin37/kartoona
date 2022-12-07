import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TagRoutingModule} from './tag-routing.module';
import {TagComponent} from './tag.component';
import {HeadersModule} from 'src/app/components/headers/headers.module';
import {CardsModule} from 'src/app/components/cards/cards.module';
import {GeneralModule} from '../../components/general/general.module';
import {SlidersCardsModule} from '../../components/cards/slider-cards.module';


@NgModule({
  declarations: [TagComponent],
    imports: [
        CommonModule,
        TagRoutingModule,
        HeadersModule,
        CardsModule,
        GeneralModule,
        SlidersCardsModule
    ]
})
export class TagModule {
}

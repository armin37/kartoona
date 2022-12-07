import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterRoutingModule } from './filter-routing.module';
import { FilterComponent } from './filter.component';
import {GeneralModule} from '../../components/general/general.module';
import {HeadersModule} from '../../components/headers/headers.module';
import {SlidersCardsModule} from '../../components/cards/slider-cards.module';


@NgModule({
  declarations: [FilterComponent],
    imports: [
        CommonModule,
        FilterRoutingModule,
        GeneralModule,
        HeadersModule,
        SlidersCardsModule
    ]
})
export class FilterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { HeadersModule } from 'src/app/components/headers/headers.module';
import { CardsModule } from 'src/app/components/cards/cards.module';
import { SlidersModule } from 'src/app/components/sliders/sliders.module';
import {GeneralModule} from '../../components/general/general.module';


@NgModule({
  declarations: [BlogComponent],
    imports: [
        CommonModule,
        BlogRoutingModule,
        HeadersModule,
        CardsModule,
        SlidersModule,
        GeneralModule
    ]
})
export class BlogModule { }

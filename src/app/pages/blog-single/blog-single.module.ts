import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogSingleRoutingModule} from './blog-single-routing.module';
import {BlogSingleComponent} from './blog-single.component';
import {CardsModule} from 'src/app/components/cards/cards.module';
import {HeadersModule} from 'src/app/components/headers/headers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SlidersModule} from '../../components/sliders/sliders.module';
import {HomeSlidersModule} from '../../components/sliders/home-sliders.module';


@NgModule({
  declarations: [BlogSingleComponent],
    imports: [
        CommonModule,
        BlogSingleRoutingModule,
        CardsModule,
        HeadersModule,
        FormsModule,
        ReactiveFormsModule,
        SlidersModule,
        HomeSlidersModule
    ]
})
export class BlogSingleModule {
}

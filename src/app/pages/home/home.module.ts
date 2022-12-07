import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeadersModule } from 'src/app/components/headers/headers.module';
import {HomeSlidersModule} from '../../components/sliders/home-sliders.module';
import {SlidersCardsModule} from '../../components/cards/slider-cards.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeadersModule,
    HomeSlidersModule,
    SlidersCardsModule
  ]
})
export class HomeModule { }

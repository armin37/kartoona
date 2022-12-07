import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {HeadersModule} from '../../components/headers/headers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    HeadersModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
  ]
})
export class AuthModule {
}

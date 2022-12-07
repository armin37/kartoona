import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutUsRoutingModule} from './about-us-routing.module';
import {AboutUsComponent} from './about-us.component';
import {HeadersModule} from '../../components/headers/headers.module';


@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    HeadersModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule {
}

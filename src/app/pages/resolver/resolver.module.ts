import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResolverRoutingModule} from './resolver-routing.module';
import {ResolverComponent} from './resolver.component';
import {HeadersModule} from '../../components/headers/headers.module';


@NgModule({
  declarations: [ResolverComponent],
  imports: [
    CommonModule,
    ResolverRoutingModule,
    HeadersModule
  ]
})
export class ResolverModule {
}

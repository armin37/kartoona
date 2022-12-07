import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentCallbackRoutingModule } from './payment-callback-routing.module';
import { PaymentCallbackComponent } from './payment-callback.component';
import {HeadersModule} from '../../components/headers/headers.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [PaymentCallbackComponent],
  imports: [
    CommonModule,
    HeadersModule,
    RouterModule,
    PaymentCallbackRoutingModule
  ]
})
export class PaymentCallbackModule { }

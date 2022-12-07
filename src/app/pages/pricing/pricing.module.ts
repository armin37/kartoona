import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './pricing.component';
import {HeadersModule} from '../../components/headers/headers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PricingComponent],
  imports: [
    CommonModule,
    HeadersModule,
    PricingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PricingModule { }

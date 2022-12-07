import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import {HeadersModule} from '../../components/headers/headers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileRoutingModule} from "../profile/profile-routing.module";

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    HeadersModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }

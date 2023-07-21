import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HeadersModule } from '../../components/headers/headers.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardsModule } from 'src/app/components/cards/cards.module';
import { TableModule } from 'primeng/table';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    HeadersModule,
    FormsModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    CardsModule,
    TableModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class ProfileModule { }

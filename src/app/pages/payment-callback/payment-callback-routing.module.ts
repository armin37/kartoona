import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PaymentCallbackComponent} from './payment-callback.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCallbackRoutingModule {
}

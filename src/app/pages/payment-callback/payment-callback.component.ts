import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {PaymentService} from '../../services/payment.service';

@Component({
  selector: 'app-payment-callback',
  templateUrl: './payment-callback.component.html',
  styleUrls: ['./payment-callback.component.scss']
})
export class PaymentCallbackComponent implements OnInit {
  paymentStatusText = {
    success: 'پرداخت با موفقیت انجام شد ',
    failed: 'مشکلی در پرداخت به وجود آمده است . اگر مبلغی از حسابتان کسر شده طی 72 ساعت به حساب شما بازگردانده میشود'
  };
  payment: any;
  paymentId = null;
  callback = '/';

  constructor(private activatedRoute: ActivatedRoute, private paymentService: PaymentService,
              private userService: UserService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.paymentId = params['id'];
      console.log(this.paymentId);
      // this.status = params['Status'];
      // console.log(this.authority, this.status);
      // this.verifyPayment();
    });
    if (this.paymentId) {
      this.getPaymentInfo(this.paymentId);
    }
  }

  ngOnInit(): void {
    // const paymentId = this.activatedRoute.snapshot.paramMap.get('id')
    // if (paymentId) {
    //   this.getPaymentInfo(paymentId);
    // }
  }

  getPaymentInfo = async (paymentId) => {
    this.payment = await this.paymentService.paymentInfo({paymentId});
    console.log(this.payment)
    // this.payment = await this.paymentService.paymentInfo(paymentId);
    if (this.payment.status === 1) {
      this.payment.text = this.paymentStatusText.success;
    }
    if (this.payment.status === 0) {
      this.payment.text = this.paymentStatusText.failed;
    }
    if (this.payment.callback) {
      this.callback = this.payment.callback;
    }
  }
  // verifyPayment = async () => {
  //   let res = await this.userService.verifyOrder({'authority': this.authority, 'status': this.status});
  //   console.log(res);
  // }
}

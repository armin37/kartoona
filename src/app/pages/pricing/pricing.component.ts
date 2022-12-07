import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from '../../services/payment.service';
import {ActivatedRoute} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  discountCode;

  pricing = [
    {
      title: 'کارتونا',
      duration: 'هفت روزه',
      price: 'رایگان',
      class: 'kartoona'
    }, {
      title: 'برنزی',
      duration: 'یک ماهه',
      price: '1100',
      unit: 'تومان',
      class: 'bronze'
    }, {
      title: 'نقره ای',
      duration: 'سه ماهه',
      price: '2200',
      unit: 'تومان',
      class: 'silver'
    }, {
      title: 'طلایی',
      duration: 'شش ماهه',
      price: '3300',
      unit: 'تومان',
      class: 'gold'
    }, {
      title: 'الماسی',
      duration: 'یک ساله',
      price: '66000',
      unit: 'تومان',
      class: 'diamond'
    },
  ];
  plans = [];
  classes = ['kartoona', 'bronze', 'silver', 'gold', 'diamond'];
  paymentForm: FormGroup;
  discountForm: FormGroup;
  discount: any;
  callback = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object,
  private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('callback')) {
      this.callback = this.route.snapshot.queryParamMap.get('callback');
    }
    this.getPlan()
    this.paymentForm = this.formBuilder.group({
      discountId: ['', Validators.required],
      gateway: [1, Validators.required],
      planId: [0, Validators.required],
      callback: [this.callback],
    });
    this.discountForm = this.formBuilder.group({
      discountCode: ['', Validators.required],
      planId: ['', Validators.required],
    });
  }

  getPlan = async () => {
    this.plans = await this.paymentService.getPlan();
    this.plans.map((plan, index) => {
      this.plans[index].class = this.classes[(index % this.classes.length)];
    })
  }
  // payment = async () => {
  //   await this.paymentService.payment({ 'planId': this.paymentForm.value.planId });
  // }
  // discountInfo = async () => {
  //   await this.paymentService.discount({ ...this.discountForm.value });
  // }
  confirmPayment = (pck, id) => {
    this.paymentForm.controls.planId.setValue(0);
    this.plans.map((price, index) => {
      this.plans[index]['showPayment'] = false;
      if (this.plans[index].title === pck.title && !pck['showPayment']) {
        this.plans[index]['showPayment'] = true;
        this.paymentForm.controls.planId.setValue(id);
        this.discountForm.controls.planId.setValue(id.toString());
      }
    })
  }

  payment = async () => {
    if (isPlatformBrowser(this.platformId)) {
      const body = {...this.paymentForm.value};
      const res = await this.paymentService.payment(body);
      if (res) {
        window.location.href = res.body.redirect;
      }
    }
  }

  checkDiscount = async () => {
    // discount: 15600
    // discountId: 1
    // payable: 62400
    // total: 78000
    if (this.discountForm.valid) {
      const res = await this.paymentService.checkDiscount({...this.discountForm.value});
      if (res) {
        this.discount = res;
        this.paymentForm.controls.discountId.setValue(this.discount.discountId.toString());
      }
    }
  }
  clearDiscount = async () => {
    this.discount = null;
    this.paymentForm.controls.discountId.setValue('');
    this.discountForm.controls.discountCode.setValue('');
  }

  setPaymentGateway = (gateway) => {
    this.paymentForm.controls.gateway.setValue(gateway);
  }
}

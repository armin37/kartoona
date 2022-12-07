import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private apiService: ApiService) {
  }

  checkDiscount = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'finance/checkDiscounts', body);
    if (res.status === 200)
      return res.body;
    return null;
  }

  verifyOrder = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'finance/verifyZarinpalPayment', body);
    if (res.status === 200)
      return res.body;
    return null;
  }

  payment = async (body) => {
    const res = await this.apiService.sendRequest('POST', 'finance/payment', body);
    if (res && res.status === 200) {
      return res;
      // window.location.href = res.body.redirect;
    }
    return null;
  }

  paymentInfo = async (body) => {
    const res = await this.apiService.sendRequest('POST', 'finance/paymentInfo',body);
    if (res && res.status === 200) {
      // window.location.href = res.body.redirect;
      return res.body;
    }
    // return {
    //   id: 123,
    //   no: 156546465,
    //   date: '2020/08/31 04:40',
    //   card: '6104*************9059',
    //   ref: 6689874131,
    //   amount: 10000,
    //   status: 1,
    // };
  }

  getPlan = async () => {
    const res = await this.apiService.sendRequest('GET', 'finance/allplan');
    if (res && res.status === 200) {
      return res.body;
    }
    return [];
  }
}

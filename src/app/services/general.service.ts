import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  redirectUrl: any;

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  getLinkRedirect = async (body) => {
    this.redirectUrl = null;
    const res: any = await this.apiService.sendRequestServer('POST', 'basic/linkRedirect', body);
    if (res && res.status === 200) {
      // this.router.navigateByUrl(res.body.newLink);
      // this.redirectUrl = res.body.newLink;
      // this.statusService.replaceState(state, 'redirecting....', {url: res.body.newLink, statusCode: res.body.redirectStatus})
      return res.body;
    }
    // this.statusService.replaceState(state, 'Not Found', {url: '/404/', statusCode: 404})
    return null;
  };
}

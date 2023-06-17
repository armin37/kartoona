import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {v4 as uuidv4} from 'uuid';
import {HttpClient} from '@angular/common/http';
import {catchError, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  userLoaded: boolean = false;
  userLoadedChange: Subject<boolean> = new Subject<boolean>();
  showPg = true;
  isFromIran = true;
  userLoadedSubject = new Subject<any>();
  userLoaded$ = this.userLoadedSubject.asObservable();

  constructor(private apiService: ApiService,
              private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  toggleUserLoaded(): void {
    this.userLoadedChange.next(!!this.user);
    this.userLoadedSubject.next(this.user);
  }

  register = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/signup', body);
    if (res && res.status === 200) {
      this.user = res.body;
      localStorage.setItem('token', this.apiService.token);
    }
    return res;
  };

  logout = async () => {
    // const res: any = await this.apiService.sendRequest('POST', 'auth/fetchprofileinfo');
    // if (res) {
    //   this.user = res;
    // }
    this.user = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('uuid');
    }
  };

  login = async (body, remember) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/login', body);
    if (res && res.status === 200) {
      this.userLoaded = true;
      this.user = res.body;
      this.apiService.token = res.headers.get('x-auth-token');
      if (isPlatformBrowser(this.platformId) && remember) {
        localStorage.setItem('token', res.headers.get('x-auth-token'));
        localStorage.setItem('uuid', res.body.uuid);
      }
      return true;
    }
    return false;
  };

  updateGeneralInfo = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/updateUser', body);
    if (res && res.status === 200) {
      return true;
    }
    return false;
  };

  updatePg = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/updatePg', body);
    console.log(res);
    if (res && res.status === 200) {
      return true;
    }
    return false;
  };

  sendValidationCode = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/sendValidationCode', body);
    if (res && res.status === 200) {
      return res;
    }
    return null;
  };

  checkUserExists = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/checkUserExists', body);
    return res;
  };

  checkValidationCode = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/checkValidationCode', body);
    if (res && res.status === 200) {
      if (isPlatformBrowser(this.platformId)) {
        this.apiService.token = res.headers.get('x-auth-token');
      }
    }
    return res;
  };

  loadLogedInUser = async () => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/fetchprofileinfo', JSON.stringify(null));
    if (res && res.status === 200) {
      this.user = res.body;
      localStorage.setItem('uuid', res.body.uuid);
    }
    this.userLoaded = true;
    this.toggleUserLoaded();
  };

  loadLoggedInUser(): Observable<any> {
    const headers = this.apiService.generateHeader(this.apiService.headerTypes.FORM_DATA);
    const obs$ = this.http.post('https://api.kartoona.com/auth/fetchprofileinfo',
      JSON.stringify(null),
      {
        headers
      }).pipe(
      shareReplay()
    );
    obs$.subscribe(data => this.userLoadedSubject.next(data),
      error => {
        this.userLoadedSubject.next(null);
        return error;
      });
    return obs$;
  }

  changePassword = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/changePassword', body);
    if (res && res.status === 200) {
      return true;
    }
    return false;
  };

  deleteAccount = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/deleteAccount', body);
    if (res && res.status === 200) {
      await this.logout();
      return true;
    }
    return false;
  };

  submitOrder = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'finance/zarinpalPayment', body);
    if (res.status === 200) {
      return res.body;
    }
    return null;
  };

  forgetPassword = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'auth/forgetingPassword', body);
    console.log(res);
    if (res && res.status === 200) {
      this.user = res.body;
      this.userLoaded = true;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token', res.headers.get('x-auth-token'));
      }
      console.log(this.user, res.headers.get('x-auth-token'));
    }
    return res;
  };

  saveComment = async (body) => {
    const res = await this.apiService.sendRequest('POST', 'movie/saveComment/', body);
    if (res.status === 200) {
      return true;
    }
    return false;
  };

  savePostComment = async (body) => {
    const res = await this.apiService.sendRequest('POST', 'basic/post/saveComment', body);
    if (res.status === 200) {
      return true;
    }
    return false;
  };

  loadUserPayments = async (body) => {
    const res = await this.apiService.sendRequest('POST', 'finance/userOrders', body);
    if (res && res.status === 200) {
      return res.body;
    }
    return [];
  };

  loadUserActivePlan = async () => {
    const res = await this.apiService.sendRequest('POST', 'finance/activePlan');
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  loadUserFavorites = async () => {
    const res = await this.apiService.sendRequest('POST', 'movie/favorites');
    if (res && res.status === 200) {
      return res.body;
    }
    return [];
  };

  checkUserIp = async () => {
    const res = await this.apiService.sendRequest('GET', 'https://extreme-ip-lookup.com/json/?key=j1EiUJrf6oJo1yFqyPlz', null, null, true);
    if (res.status !== 200 || res.body.country !== 'Iran') {
      this.isFromIran = false;
    }
  };

  setUUID = async (forceNew?) => {
    if (isPlatformBrowser(this.platformId)) {
      let uuid = await localStorage.getItem('uuid');
      if (!uuid || (!uuid && uuid.length < 1) || forceNew) {
        uuid = uuidv4();
        await localStorage.setItem('uuid', uuid);
      }
      this.apiService.uuid = uuid;
    }
  };
}

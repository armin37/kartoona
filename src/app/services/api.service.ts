import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;
  token: string;
  uuid: string;
  private ENDPOINT = 'https://api.kartoona.com/';
  // private ENDPOINT = 'http://45.159.115.143/';
  // ENDPOINT = 'http://localhost:8080/';
  // private ENDPOINT = 'http://192.168.1.25:4000/';
  retryCount = 1;
  headerTypes = {
    JSON: 'JSON',
    FROM_DATA: 'FORM_DATA',
  };
  private pid: string;
  private language: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateHeader = (type = this.headerTypes.JSON) => {
    const authHead = {};
    let header = null;
    if (this.token) {
      authHead['Authorization'] = 'Bearer ' + this.token;
    }
    // if (this.language) {
    //   authHead['language'] = this.language;
    // }
    // if (this.pid) {
    //   authHead['pid'] = this.pid;
    // }
    if (type === this.headerTypes.JSON) {
      header = new HttpHeaders({...authHead, 'Content-Type': 'application/json'});
    } else if (type === this.headerTypes.FROM_DATA) {
      header = new HttpHeaders(authHead);
      header.append('Content-Type', 'multipart/form-data');
      header.append('Accept', 'application/json');
    }
    return header;
  };

  public sendRequest = async (method = 'POST',
                              url = '/',
                              body = {},
                              headers = null,
                              notConcatEndpoint?: boolean,
                              hideLoading?: boolean,
                              hideError?: boolean) => {
    // if (isPlatformBrowser(this.platformId)) {
    if (!headers) {
      headers = this.generateHeader(this.headerTypes.FROM_DATA);
    }

    if (!notConcatEndpoint) {
      url = this.ENDPOINT + url;
    }
    let response = null;
    for (let i = 0; i < this.retryCount; i++) {
      try {
        const res: any = await this.httpClient
          .request(method, url, {
            body,
            headers,
            observe: 'response',
            withCredentials: false
          }).toPromise();
        if (res && res.body && res.body.message) {
          this.presentToast(res.body.message);
        }
        //old
        // response = res.body;
        //new
        response = res;
        break;
      } catch (err) {
        response = err;
        if (err.status >= 500) {
          await this.delay(500 * (i + 1));
          if (i === this.retryCount - 1) {
            console.log(err);
            if (!hideError && err && err.error) {
              this.presentToast(err.error.message);
            }
            if (err.status === 401) {
            }
          }
        }
      }
    }
    return response;
    // }
  };


  public sendRequestServer = async (method = 'POST',
                                    url = '/',
                                    body = {},
                                    headers = null) => {

    url = this.ENDPOINT + url;
    let response = null;
    try {
      const res: any = await this.httpClient
        .request(method, url, {
          body,
          headers,
          observe: 'response',
          withCredentials: false
        }).toPromise();
      response = res;
    } catch (err) {
      console.log(err);
    }
    return response;
  };
  public sendJsonp = async (url) => {
    try {
      return await this.httpClient
        .jsonp(url, 'callback').toPromise();
    } catch (err) {
      console.error(err, url);
    }
    return null;
  };
  public uploadFile = async (url = '/',
                             body: any = {},
                             headers = null,
                             notConcatEndpoint?: boolean,
                             hideLoading = false,
                             hideError?: boolean) => {
    if (!headers) {
      headers = this.generateHeader(this.headerTypes.FROM_DATA);
    }
    const formData = new FormData();
    if (body) {
      console.log(body);
      Object.keys(body).map(function(key, index) {
        if (body[key].name) {
          formData.append(key, body[key].field, body[key].name);
        } else {
          formData.append(key, body[key]);
        }
      });
    }
    let response = null;
    for (let i = 0; i < this.retryCount; i++) {
      try {
        const res: any = await this.httpClient
          .post(this.ENDPOINT + url, formData, {
            observe: 'response',
            headers,
            withCredentials: true
          })
          .toPromise();
        if (res.notice) {
        }
        console.log(res);
        response = res;
        break;
      } catch (err) {
        await this.delay(500 * (i + 1));
        if (i === 2) {
          response = err;
          if (!hideError) {
            this.presentToast(err.error.message);
          }
          if (err.status === 401) {
            // localStorage.removeItem('token')
            // this.router.navigateByUrl('/main');
            //return null;
          }
        }
      }
    }
    return response;
  };

  async presentToast(message) {
    // alert(message);
    // const toast = await this.toastController.create({
    //     duration: 2500,
    //     message: message,
    //     position: 'top'
    // });
    // toast.present();
  }
}

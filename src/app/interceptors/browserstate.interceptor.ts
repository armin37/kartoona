import {Injectable} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // const dupReq = req.clone({
    //   url: req.url.replace('https://api.kartoona.com', 'http://localhost:8086')
    // });

    const storedResponse: string = this.transferState.get(makeStateKey(req.url), null);

    if (storedResponse) {
      const response = new HttpResponse({body: storedResponse, status: 200});
      return of(response);
    }

    return next.handle(req);
  }
}

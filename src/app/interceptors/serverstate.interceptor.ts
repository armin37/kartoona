import {Injectable, NgZone} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import * as memoryCache from 'memory-cache';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState,
              private ngZone: NgZone) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    // if (req.method === 'GET') {
    // const dupReq = req.clone({
    //   url: req.url.replace('https://api.kartoona.com', 'http://localhost:8086')
    // });

    const cachedData = memoryCache.get(req.url);
    if (cachedData) {
      this.transferState.set(makeStateKey(req.url), cachedData);
      return of(new HttpResponse({body: cachedData, status: 200}));
    }

    return next.handle(req).pipe(
      tap(event => {
        if ((event instanceof HttpResponse && (event.status === 200 || event.status === 202))) {
          this.transferState.set(makeStateKey(req.url), event.body);
          this.ngZone.runOutsideAngular(() => {
            memoryCache.put(req.url, event.body, 60 * 10000);
          });
        }
      })
    );
    // }
  }
}

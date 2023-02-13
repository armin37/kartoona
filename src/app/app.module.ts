import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserStateInterceptor} from './interceptors/browserstate.interceptor';

@Injectable()
export class NoCacheHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      setHeaders: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    });
    return next.handle(authReq);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatSnackBarModule,
    NgbModule,
    BrowserTransferStateModule
  ],
  providers: [
    // { provide: UrlSerializer, useClass: CustomUrlSerializer }
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

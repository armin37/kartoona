import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {UniversalDeviceDetectorService} from './universal-device-detector.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServerStateInterceptor} from './interceptors/serverstate.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  providers: [
    // Add universal-only providers here
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    },
    {
      provide: DeviceDetectorService,
      useClass: UniversalDeviceDetectorService
    }
  ],
  bootstrap: [AppComponent],
})

export class AppServerModule {
}

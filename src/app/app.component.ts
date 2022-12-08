import {Component, Inject, PLATFORM_ID} from '@angular/core';
// import {UserService} from './services/user.service';
// import {DeviceDetectorService} from 'ngx-device-detector';
// import {isPlatformBrowser} from '@angular/common';
// import {GeneralService} from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kartoona';
  help;
  device: any;
  iosHelpVisible = false;

  // constructor(public userService: UserService,
  //             private deviceService: DeviceDetectorService,
  //             @Inject(PLATFORM_ID) private platformId: Object,
  //             public generalService: GeneralService) {
  //   // userService.loadLogedInUser();
  //
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.help = localStorage.getItem('help');
  //   }
  //   this.initApp();
  // }
  //
  // initApp() {
  //   this.userService.setUUID();
  //   // this.userService.checkUserIp();
  //   this.device = this.deviceService.os;
  //   if (!this.help && (this.device === 'ios' || this.device === 'IOS' || this.device === 'iOS')) {
  //     this.showHelp();
  //   }
  // }
  //
  // async showHelp() {
  //   this.iosHelpVisible = true;
  //   if (isPlatformBrowser(this.platformId)) {
  //     localStorage.setItem('help', 'done');
  //   }
  // }
  //
  // async closeHelp() {
  //   this.iosHelpVisible = false;
  // }

}

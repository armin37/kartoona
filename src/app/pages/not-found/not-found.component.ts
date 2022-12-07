import {Component, OnInit, Inject, Optional, PLATFORM_ID} from '@angular/core';
import {RESPONSE} from '@nguniversal/express-engine/tokens';
// import { isPlatformBrowser } from '@angular/common';
// import {RequestStatusService} from 'src/app/services/request-status.service';
import {isPlatformBrowser} from '@angular/common';
import {NavigationEnd, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {GeneralService} from '../../services/general.service';
import {TransferState} from '@angular/platform-browser';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(
    // private statusService: RequestStatusService,
              private pl: PlatformLocation,) {
  }

  ngOnInit(): void {
  }
}

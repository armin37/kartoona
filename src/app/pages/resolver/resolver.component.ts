import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
// import {RequestStatusService} from '../../services/request-status.service';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';

import { RESPONSE, REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';
import { Request, Response } from 'express';

@Component({
  selector: 'app-resolver',
  templateUrl: './resolver.component.html',
  styleUrls: ['./resolver.component.scss']
})
export class ResolverComponent implements OnInit {

  constructor(@Optional() @Inject(REQUEST) private request: Request,
    @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platformId: any,
    private pl: PlatformLocation,
    private generalService: GeneralService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.redirector();
  }

  redirector = async () => {
    let uri = decodeURI(this.router.url);
    let res = await this.generalService.getLinkRedirect({ 'previousLink': uri });
    console.log(uri);
    if (res) {
      if (isPlatformServer(this.platformId)) {
        this.response.redirect(res.redirectStatus, res.newLink);
      }
      else
        this.router.navigateByUrl(res.newLink);
    } else {
      if (isPlatformServer(this.platformId)) {
        this.response.status(404);
      }
    }
  }

}

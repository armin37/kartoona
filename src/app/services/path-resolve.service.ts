import {Injectable, OnInit} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PathResolveService implements Resolve<string> {
  constructor(// private router: Router,
    //           private statusService: RequestStatusService,
    // private state: TransferState,
    /*private generalService: GeneralService*/) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): any {
    // return this.generalService.getLinkRedirect({'previousLink': state.url},state);
    // return res;
    // if(res&&res.status==)
    return true;
  }


}

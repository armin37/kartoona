import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.userService.userLoaded) {
        console.log(this.userService.user)
        if (this.userService.user) {
          this.router.navigateByUrl('/profile')
          return resolve(false);
        }
        return resolve(true);
      } else {
        this.userService.loadLogedInUser();
        this.userService.userLoadedChange.subscribe(
          data => {
            console.log(this.userService.user, data)
            if (data) {
              this.router.navigateByUrl('/profile')
              return resolve(false);
            }
            return resolve(true);
          });
      }
    })
  }

}

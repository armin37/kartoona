import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {UserService} from './services/user.service';
import {catchError, finalize, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.userLoaded) {
      return !!this.userService.user ? true : this.router.parseUrl('/');
    }
    this.userService.loadLoggedInUser();
    return this.userService.userLoaded$.pipe(
      map(data => {
        return !!data ? true : this.router.parseUrl('/');
      })
    );
  }
}

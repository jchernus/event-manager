import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class ModeratorGuard implements CanActivate {
  constructor (private auth: AuthService, private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user.pipe(
      take(1),
      map(user => user && this.auth.isModerator(user) ? true : false),
      tap(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          console.error('Access denied.');
          this.router.navigate(['/']);
          return false;
        }
      })
    );

  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserRole } from '@app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectUser } from '../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        if (user && user.role === UserRole.Admin) {
          return true;
        }
        this.router.navigate(['/posts']);
        return false;
      })
    );
  }
}

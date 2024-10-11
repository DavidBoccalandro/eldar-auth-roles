import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserRole } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: Replace simulation of API call
  login(username: string, password: string): Observable<any> {
    const isAdmin = username.toLowerCase().includes('admin');
    const response = {
      userId: '1',
      username: username,
      role: isAdmin ? UserRole.Admin : UserRole.User,
      token: 'fake-jwt-token',
    };

    return of(response).pipe(delay(1000));
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

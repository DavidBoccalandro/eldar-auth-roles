import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user.model';
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
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

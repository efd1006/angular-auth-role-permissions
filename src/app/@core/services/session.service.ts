import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  constructor(
    private router: Router,
  ) { }

  setAccessToken(authToken) {
    localStorage.setItem('access_token', String(authToken));
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem('refresh_token', String(refreshToken));
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  clearAll() {
    localStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('/auth/login');
    }, 500);
  }
}

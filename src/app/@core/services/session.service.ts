import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_PATH } from '../constants/routes';

@Injectable({
    providedIn: 'root',
  })
  export class SessionService {
    private accessToken: string = '';
    private refreshToken: string = '';

    constructor(
      private router: Router
    ) {

    }

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
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setTimeout(() => {
        this.router.navigateByUrl(LOGIN_PATH);
      }, 500);
    }
  }

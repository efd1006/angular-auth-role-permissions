import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LOGIN_PATH } from '../constants/routes';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate([`${LOGIN_PATH}`]);
    return false;
  }
}
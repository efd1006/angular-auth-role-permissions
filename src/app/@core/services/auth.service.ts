import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { BaseService } from './base.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {

  loggedIn: boolean;
  private user = new BehaviorSubject<User>(null);

  constructor(
    public http: HttpClient,
    public sessionService: SessionService,
  ) {
    super(http, sessionService);

    this.loggedIn = null;
    this.me().subscribe((user) => {
      this.setUser(user);
      this.loggedIn = true;
    });
  }

  login(email, password) {
    return this.$post(`/auth/login`, { email, password }, false)
    .pipe(
      map((res: any) => {
        if (res.access_token && res.refresh_token) {
          this.sessionService.setAccessToken(res.access_token);
          this.sessionService.setRefreshToken(res.refresh_token);
          this.setUser(res.user as User);
          this.loggedIn = true;
        }
        return res;
      }),
    );
  }

  register(email, password) {
    return this.$post(`/auth/register`, {email, password});
  }

  me() {
    return this.$get(`/auth/me`).pipe(map(user => user as User));
  }

  setUser(user: User) {
    this.user.next(user);
  }

  getUser() {
    return this.user.asObservable();
  }

  isLoggedIn() {
    if (this.loggedIn == null) {
      const auth = this.sessionService.getAccessToken();
      return auth;
    } else {
      return this.loggedIn;
    }
  }

  logout() {
    this.loggedIn = false;
    this.sessionService.deleteAll();
  }

}

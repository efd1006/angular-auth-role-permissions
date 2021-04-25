import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'
import { SessionService } from '../services/session.service'
import { ToastrService } from '../services/toastr.service'
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );
  constructor(
    // private authService: AuthService,
    private sessionService: SessionService,
    private toastrService: ToastrService,
    private injector: Injector,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          (!request.url.includes('/login') ||
            !request.url.includes('/auth/refresh'))
        ) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(AuthService)
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.sessionService.setAccessToken(token['access_token'])
          this.sessionService.setRefreshToken(token['refresh_token'])
          return next.handle(this.addToken(request));
        }),
        catchError((error) => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          if (error.status === 400 && error.url.includes('/refresh')) {
            if(this.sessionService.getRefreshToken()) {
              this.toastrService.showToast('bottom-right', 'danger', 'alert-circle-outline', "Session timeout.", 'Please re-login');
              setTimeout(() => {
                this.sessionService.clearAll();
              }, 1000);
            }
          }
          return throwError(error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request));
        }),
      );
    }
  }

  private addToken(request: HttpRequest<any>) {
    const token = this.sessionService.getAccessToken()
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

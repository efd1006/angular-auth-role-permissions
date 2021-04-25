import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../services/session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private sesssionService: SessionService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('/auth/refresh')) {
      const token = this.sesssionService.getAccessToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.sesssionService.getAccessToken()}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PUBLIC_URLS } from '../constants/app.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (PUBLIC_URLS.some((url) => req.url.includes(url)))
      return next.handle(req);

    const tokens = this.authService.getTokens();
    const request = req.clone({
      setHeaders: { Authorization: `Bearer ${tokens.accessToken}` },
    });

    return next.handle(request);
  }
}

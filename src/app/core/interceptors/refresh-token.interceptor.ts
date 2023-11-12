import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Access token is expired, try refreshing
        if (error.status === 401) {
          return this.authService.refreshTokens().pipe(
            switchMap((authTokens) => {
              this.authService.saveTokens(authTokens);
              // Use the new token for the retry
              const retriedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${authTokens.accessToken}`,
                },
              });
              return next.handle(retriedReq);
            }),
            catchError((error) => {
              this.router.navigate(['auth/login'], {
                skipLocationChange: true,
              });
              return of();
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}

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
import { PUBLIC_URLS } from '../constants/app.constants';
import { Router } from '@angular/router';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notifyService: CustomNotificationService,
    private router: Router
  ) {}

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

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Access token is expired or we simply aren't authorized, then try refreshing
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
              this.authService.clearTokens();
              this.notifyService.showNotification(
                5000,
                'error',
                'Hozzáférés megtagadva',
                'Nem rendelkezel a szükséges hozzáféréssel az oldal megtekintéséhez.'
              );
              return of();
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}

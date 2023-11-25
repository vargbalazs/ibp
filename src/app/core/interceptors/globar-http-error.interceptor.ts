import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { NOTIFICATION_TYPE } from '../constants/app.constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomHttpErrorResponse } from '../interfaces/custom-http-error-response.interface';

@Injectable()
export class GlobalHttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private notifyService: CustomNotificationService,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!(error.error instanceof ErrorEvent)) {
          if (
            error.status != 401 &&
            (error.error as CustomHttpErrorResponse).message != 'Database error'
          ) {
            this.notifyService.showNotification(
              request.context.get(NOTIFICATION_TYPE).type,
              5000,
              'error',
              'Hiba',
              'Ismeretlen eredetű hiba lépett fel. Lépj kapcsolatba a rendszer adminisztrátorával.',
              request.context.get(NOTIFICATION_TYPE).container
            );
            this.loaderService.hide();
            return of();
          }
        }
        return throwError(() => error);
      })
    );
  }
}

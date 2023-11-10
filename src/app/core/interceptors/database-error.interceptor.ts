import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatabaseError } from '../interfaces/database-error.interface';
import { CustomHttpErrorResponse } from '../interfaces/custom-http-error-response.interface';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

@Injectable()
export class DatabaseErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: CustomNotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!(error.error instanceof ErrorEvent)) {
          const httpError = error.error as CustomHttpErrorResponse;

          if (httpError.message == 'Database error') {
            const dbError = httpError as DatabaseError;
            switch (dbError.details.code) {
              case '23503':
                this.notifyService.showNotification(
                  5000,
                  'error',
                  'Törlés nem sikerült!',
                  `A törlés sajnos nem sikerült, mivel még vannak kapcsolódó objektumok (${this.getReferencedObjectName(
                    dbError.details.detail
                  )}).`
                );
            }
          }
        }
        return throwError(() => error);
      })
    );
  }

  getReferencedObjectName(details: string): string {
    if (details.includes('operations')) return 'funkciók';
    if (details.includes('permissions')) return 'jogosultságok';
    if (details.includes('users_rolegroups')) return 'felhasználók';
    return '';
  }
}

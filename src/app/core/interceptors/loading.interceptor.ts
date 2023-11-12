import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { USE_LOADING_SPINNER } from '../constants/app.constants';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.context.get(USE_LOADING_SPINNER)) this.loaderService.show();

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) this.loaderService.hide();
        return event;
      }),
      catchError((error) => {
        this.loaderService.hide();
        return throwError(() => error);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { PERMISSION } from '../constants/app.constants';

@Injectable()
export class PermissionInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.context.get(PERMISSION)) {
      req = req.clone({
        headers: req.headers.set('Ibp-Permission', req.context.get(PERMISSION)),
      });
      console.log('belép');
    }

    return next.handle(req);
  }
}

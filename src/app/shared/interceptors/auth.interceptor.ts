import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const cloned = req.clone({
        headers: req.headers.set('TPAPIKey', environment.k)
      });
      return next.handle(cloned);
    }
}

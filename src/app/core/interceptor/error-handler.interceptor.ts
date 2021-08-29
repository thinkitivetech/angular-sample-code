import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SnackBarService } from '../Services/snack-bar.service';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private _snackBar: SnackBarService,private _auth:AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg=error&&error.error.responsePayload&&error.error.responsePayload.message||'Unauthorised request...';
        this._snackBar.errorSnackBar(errorMsg);
        this._auth.clearStorage();
        return throwError(error);
      })
    );
  }
}

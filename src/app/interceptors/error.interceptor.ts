import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { delay, Observable, retryWhen, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

const maxRetries = 2;
const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retryWhen((error: Observable<any>): Observable<any> => {
                return error.pipe(
                    mergeMap((error, index) => {
                        if (index < maxRetries && error.status == 500) {
                            return of(error).pipe(delay(delayMs));
                        }

                        this.router.navigate(['/*']);
                        throw error;
                    })
                );
            })
        );
    }
}

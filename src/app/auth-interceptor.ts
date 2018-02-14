import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


/**
 * Http interceptor for add the JWToken with any http request
 * Taken at 01/31/2018 from https://blog.angular-university.io/angular-jwt-authentication/
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('id_token');

        if (idToken) {            
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    idToken)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}

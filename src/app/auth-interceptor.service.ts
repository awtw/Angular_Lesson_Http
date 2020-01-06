import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Request is on its way');
    console.log(req.url);
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
    return next.handle(modifiedRequest);
  }
}

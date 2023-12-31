import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private excludedEndpoints = ['/authenticate'];

  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    // Check if the request URL is in the excluded endpoints list
    if (this.isExcludedEndpoint(request.url)) {
      return next.handle(request);
    }

    // Modify the request to add the Bearer token
    const token = localStorage.getItem('token')
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }

  private isExcludedEndpoint(url: string): boolean {
    return this.excludedEndpoints.some(endpoint => url.includes(endpoint));
  }
}

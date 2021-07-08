import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private SERVER_URL: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {}

  signUserUp(data: object) {
    return this.http.post(`${this.SERVER_URL}/signup`, data).toPromise();
  }

  logUserIn(data: object) {
    return this.http.post(`${this.SERVER_URL}/login`, data).toPromise();
  }

  logUserOut() {
    this.cookie.delete('isAuthenticated');
    this.router.navigateByUrl('login');
  }
}

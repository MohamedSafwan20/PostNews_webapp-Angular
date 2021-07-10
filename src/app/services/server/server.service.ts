import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  // Authentication methods
  signUserUp(data: object) {
    return this.http.post(`${this.SERVER_URL}/signup`, data).toPromise();
  }

  logUserIn(data: object) {
    return this.http.post(`${this.SERVER_URL}/login`, data).toPromise();
  }

  logUserOut() {
    this.cookie.deleteAll();
    this.router.navigateByUrl('login');
  }
  // End of Authentication methods

  // Posts method
  savePost(data: object) {
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookie.get('token')
    );

    return this.http
      .post(`${this.SERVER_URL}/posts`, data, {
        headers: header,
      })
      .toPromise();
  }

  getPosts() {
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookie.get('token')
    );

    return this.http
      .get(`${this.SERVER_URL}/posts`, {
        headers: header,
      })
      .toPromise();
  }
  // End of Posts method
}

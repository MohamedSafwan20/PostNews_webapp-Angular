import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private SERVER_URL: string = 'http://localhost:3000';

  private authorizationHeader = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + this.cookie.get('token')
  );

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

    // For breaking the SPA navigation, so user can't go back to the page which needs authentication
    window.location.replace('/login');
  }
  // End of Authentication methods

  // Posts method
  savePost(data: object) {
    return this.http
      .post(`${this.SERVER_URL}/posts`, data, {
        headers: this.authorizationHeader,
      })
      .toPromise();
  }

  getPosts() {
    return this.http
      .get(`${this.SERVER_URL}/posts`, {
        headers: this.authorizationHeader,
      })
      .toPromise();
  }

  getPost(postId: string) {
    return this.http
      .get(`${this.SERVER_URL}/posts/${postId}`, {
        headers: this.authorizationHeader,
      })
      .toPromise();
  }

  getUserPosts() {
    return this.http
      .get(`${this.SERVER_URL}/user-posts`, {
        headers: this.authorizationHeader,
      })
      .toPromise();
  }

  editUserPost(data: object) {
    return this.http
      .patch(`${this.SERVER_URL}/user-posts`, data, {
        headers: this.authorizationHeader,
      })
      .toPromise();
  }
  // End of Posts method

  // User methods
  getUser() {
    return this.http
      .get(`${this.SERVER_URL}/user`, {
        headers: this.authorizationHeader,
      })
      .toPromise();
  }

  editUserProfile(data: object) {
    return this.http
      .patch(`${this.SERVER_URL}/user`, data, {
        headers: this.authorizationHeader,
      })
      .toPromise();
  }
  // End of User methods
}

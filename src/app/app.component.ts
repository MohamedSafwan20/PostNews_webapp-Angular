import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isAuthenticated: boolean = false;

  constructor(public cookie: CookieService, private router: Router) {
    // redirecting user to login page if not logged in
    if (this.cookie.get('isAuthenticated')) this.isAuthenticated = true;
    else this.isAuthenticated = false;
    if (!this.isAuthenticated) this.router.navigateByUrl('/login');
  }
}

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
    if (this.cookie.get('isAuthenticated')) this.isAuthenticated = true;
    else this.isAuthenticated = false;
    if (!this.isAuthenticated) router.navigateByUrl('/login');
  }
}

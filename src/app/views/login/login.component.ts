import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // public isAuthenticated: boolean = false;

  constructor(public cookie: CookieService, private router: Router) {}

  ngOnInit(): void {}

  // login() {
  //   this.cookie.set('test', 'hello', new Date().getDate() + 1);
  //   this.router.navigateByUrl('');
  // }
}

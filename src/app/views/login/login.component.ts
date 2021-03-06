import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]{8,}$'),
  ]);

  public response: any = false;

  public hide: boolean = true;

  public showBtnSpinner: boolean = false;

  constructor(
    public cookie: CookieService,
    private validator: ValidatorService,
    private server: ServerService
  ) {}

  ngOnInit(): void {}

  getUsernameErrors() {
    return this.validator.validateUsername(this.username);
  }

  getPasswordErrors() {
    return this.validator.validatePassword(this.password);
  }

  async login() {
    if (!(this.username.invalid || this.password.invalid)) {
      this.showBtnSpinner = true;
      this.response = await this.server.logUserIn({
        username: this.username.value,
        password: this.password.value,
      });

      if (!this.response.success) this.showBtnSpinner = false;
      else {
        this.cookie.set('isAuthenticated', 'true', new Date().getDate() + 15);
        this.cookie.set(
          'token',
          this.response.token,
          new Date().getDate() + 15
        );
        // For reloading the posts from db, can't reload posts if using router api
        window.location.replace(environment.BASE_URL);
      }
    }
  }
}

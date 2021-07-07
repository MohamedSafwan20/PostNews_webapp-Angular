import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]{8,}$'),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);

  customUsernameError: string = '';
  customConfirmPasswordError: string = '';

  showBtnSpinner: boolean = false;

  constructor(
    private validator: ValidatorService,
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getUsernameErrors() {
    return this.validator.validateUsername(this.username);
  }

  getEmailErrors() {
    return this.validator.validateEmail(this.email);
  }

  getPasswordErrors() {
    return this.validator.validatePassword(this.password);
  }

  getConfirmPasswordErrors() {
    let error = this.validator.validateConfirmPassword(
      this.password,
      this.confirmPassword
    );
    if (error === "Two passwords didn't match") {
      this.customConfirmPasswordError = error;
      return null;
    } else this.customConfirmPasswordError = '';

    return error;
  }

  async signUserUp() {
    if (
      !(
        this.username.invalid ||
        this.email.invalid ||
        this.password.invalid ||
        this.confirmPassword.invalid ||
        this.customConfirmPasswordError
      )
    ) {
      this.showBtnSpinner = true;
      this.customUsernameError = await this.server.signUserUp({
        username: this.username.value,
        email: this.email.value,
        password: this.password.value,
      });
      console.log(this.customUsernameError);
      if (this.customUsernameError !== '') this.showBtnSpinner = false;
      else this.router.navigateByUrl('');
    }
  }
}

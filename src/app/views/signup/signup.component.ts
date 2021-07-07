import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]{8,}$'),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);

  customConfirmPasswordError: string = '';

  constructor(private validator: ValidatorService) {}

  ngOnInit(): void {}

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
}

import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  validateUsername(username: FormControl) {
    if (username.hasError('required')) return 'Required';
    return username.hasError('minLength') !== null
      ? 'Username must be 3 characters long'
      : null;
  }

  validateEmail(email: FormControl) {
    if (email.hasError('required')) return 'Required';
    return email.hasError('email') ? 'Email is invalid' : null;
  }

  validatePassword(password: FormControl) {
    if (password.hasError('required')) return 'Required';
    return password.hasError('pattern')
      ? 'Password must be 8 characters long'
      : null;
  }

  validateConfirmPassword(password: FormControl, confirmPassword: FormControl) {
    if (confirmPassword.hasError('required')) return 'Required';
    if (password.value !== confirmPassword.value)
      return "Two passwords didn't match";
    return null;
  }
}

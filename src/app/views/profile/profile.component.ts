import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagePickerConf } from 'ngp-image-picker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private response: any = null;

  email = new FormControl('', [Validators.required, Validators.minLength(3)]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]{8,}$'),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  image: string = '';

  showBtnSpinner: boolean = false;

  constructor(
    private validator: ValidatorService,
    private server: ServerService,
    private snackbar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.response = await this.getUserDetail();

    // populating every field with user detail
    this.email.setValue(this.response.data.email);
    this.password.setValue(this.response.data.password);
    this.confirmPassword.setValue(this.response.data.password);
    this.initialImage = this.response.data.avatar;
  }

  customConfirmPasswordError: string = '';

  public hide: boolean = true;

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

  getUserDetail(): object {
    return this.server.getUser();
  }

  storeImage(event: any) {
    this.image = event;
  }

  imagePickerConf: ImagePickerConf = {
    borderRadius: '10px',
    language: 'en',
    width: '14em',
    height: '14em',
  };
  initialImage: string = '';

  async editUserProfile() {
    if (
      !(
        this.email.invalid ||
        this.password.invalid ||
        this.confirmPassword.invalid ||
        this.customConfirmPasswordError
      )
    ) {
      this.showBtnSpinner = true;
      this.response = await this.server.editUserProfile({
        email: this.email.value,
        password: this.password.value,
        avatar: this.image,
      });
      if (this.response.success)
        this.snackbar.open('Profile successfully changed!', 'close');
      this.showBtnSpinner = false;
    }
  }
}

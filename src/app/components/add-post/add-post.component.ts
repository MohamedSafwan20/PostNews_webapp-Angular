import { CommonService } from './../../services/common/common.service';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server/server.service';
import { ValidatorService } from './../../services/validator/validator.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ImagePickerConf } from 'ngp-image-picker';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  image: string = '';

  public response: any = false;

  constructor(
    private validator: ValidatorService,
    private server: ServerService,
    private common: CommonService
  ) {}

  ngOnInit(): void {}

  getTitleErrors() {
    return this.validator.validateTitle(this.title);
  }

  getDescriptionErrors() {
    return this.validator.validateDescription(this.description);
  }

  async createPost() {
    if (!(this.title.invalid || this.description.invalid)) {
      this.response = await this.server.savePost({
        title: this.title.value,
        description: this.description.value,
        image: this.image,
      });
      if (this.response.success) {
        this.common.refresh('/');
      }
    }
  }

  storeImage(event: any) {
    this.image = event;
  }

  imagePickerConf: ImagePickerConf = {
    borderRadius: '4px',
    language: 'en',
    width: '120px',
    height: '60px',
  };
}

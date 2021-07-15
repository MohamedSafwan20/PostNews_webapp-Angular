import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { CommonService } from 'src/app/services/common/common.service';
import { ServerService } from 'src/app/services/server/server.service';
import { ValidatorService } from 'src/app/services/validator/validator.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  image: string = '';

  public response: any = null;

  private postId: string = '';

  showBtnSpinner: boolean = false;

  constructor(
    private validator: ValidatorService,
    private server: ServerService,
    private common: CommonService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.activatedRoute.params.subscribe(async (param) => {
      this.postId = param.id;
      this.response = await this.server.getPost(param.id);

      // populating every field with post detail
      this.title.setValue(this.response.data.title);
      this.description.setValue(this.response.data.description);
      this.initialImage = this.response.data.image;
    });
  }

  getTitleErrors() {
    return this.validator.validateTitle(this.title);
  }

  getDescriptionErrors() {
    return this.validator.validateDescription(this.description);
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
  initialImage: string = '';

  async editPost() {
    if (!(this.title.invalid || this.description.invalid)) {
      this.showBtnSpinner = true;
      this.response = await this.server.editUserPost({
        id: this.postId,
        title: this.title.value,
        description: this.description.value,
        image: this.image,
      });
      if (this.response.success) {
        this.snackbar.open('Post successfully edited!', 'close', {
          duration: 3000,
        });
      }
      this.showBtnSpinner = false;
    }
  }
}

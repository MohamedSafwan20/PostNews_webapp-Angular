import { Component, OnInit } from '@angular/core';
import { ImagePickerConf } from 'ngp-image-picker';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  handleEvent(event: any) {
    console.log('event');
    console.log(event);
  }

  imagePickerConf: ImagePickerConf = {
    borderRadius: '4px',
    language: 'en',
    width: '120px',
    height: '60px',
  };
}

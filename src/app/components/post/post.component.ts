import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() posts: any = null;

  constructor() {}

  ngOnInit() {}

  handleEvent() {
    let date = new Date();
    console.log(date.toTimeString());
  }
}

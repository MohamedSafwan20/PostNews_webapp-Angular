import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server/server.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {
  public response: any = null;

  constructor(private server: ServerService) {}

  async ngOnInit() {
    this.response = await this.server.getUserPosts();
    console.log(this.response);
  }
}

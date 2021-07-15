import { CommonService } from './../../services/common/common.service';
import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server/server.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {
  public response: any = null;

  constructor(private server: ServerService, private common: CommonService) {}

  async ngOnInit() {
    this.response = await this.server.getUserPosts();
  }

  deletePost(postId: string) {
    this.server.deleteUserPost(postId);
    this.common.refresh('/my-posts');
  }
}

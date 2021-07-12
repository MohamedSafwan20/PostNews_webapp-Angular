import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  private response: any = null;
  public posts: any = null;

  constructor(private server: ServerService) {}

  async ngOnInit() {
    this.response = await this.server.getPosts();
    if (this.response.success) {
      this.response.data.length !== 0
        ? (this.posts = this.response.data)
        : null;
    }
  }
}

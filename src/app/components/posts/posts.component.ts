import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public response: any = false;
  public posts: any = false;

  constructor(private server: ServerService) {}

  async ngOnInit() {
    this.response = await this.server.getPosts();
    if (this.response.success) this.posts = this.response.data;
    else this.posts = 'No Posts';
  }
}

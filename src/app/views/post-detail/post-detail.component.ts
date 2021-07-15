import { ServerService } from './../../services/server/server.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  public response: any = null;

  public currentUrl: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private server: ServerService
  ) {}

  ngOnInit() {
    this.currentUrl = window.location.href;
    this.activatedRoute.params.subscribe(async (param) => {
      this.response = await this.server.getPost(param.id);
    });
  }
}

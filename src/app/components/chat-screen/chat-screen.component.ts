import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss'],
})
export class ChatScreenComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  public currentUser: any;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => (this.currentUser = params)
    );
  }
}

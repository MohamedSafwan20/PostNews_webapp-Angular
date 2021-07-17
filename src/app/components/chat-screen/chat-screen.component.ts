import { SocketService } from './../../services/socket/socket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss'],
})
export class ChatScreenComponent implements OnInit {
  public params: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private socket: SocketService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.params = params;
    });
  }

  ngOnInit(): void {
    // this.socket.connect();
    console.log(this.params);
  }
}

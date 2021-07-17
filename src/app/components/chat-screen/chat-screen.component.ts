import { ServerService } from 'src/app/services/server/server.service';
import { SocketService } from './../../services/socket/socket.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss'],
})
export class ChatScreenComponent implements OnInit {
  public params: any;

  public initializeChatMessagesFromDb: any;

  public chatMsg: string = '';
  chatList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private socket: SocketService,
    private ref: ElementRef,
    private server: ServerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.roomId) {
        this.params = params;
        this.server
          .getChatMessages(params.roomId)
          .then((messages) => (this.initializeChatMessagesFromDb = messages));
      }
    });

    this.socket.getLiveMessage().subscribe((msg) => {
      this.chatList = this.ref.nativeElement.querySelector('.chat-list');
      this.chatList.insertAdjacentHTML('beforeend', `<li>${msg}</li>`);
    });
  }

  sendMessage() {
    this.socket.sendMessage({
      message: this.chatMsg,
      room: this.params.roomId,
    });
  }
}

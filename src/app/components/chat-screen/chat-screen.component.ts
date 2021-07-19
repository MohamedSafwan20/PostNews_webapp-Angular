import { ServerService } from 'src/app/services/server/server.service';
import { SocketService } from './../../services/socket/socket.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss'],
})
export class ChatScreenComponent implements OnInit {
  @Input() chatRoom: any;

  public params: any;

  public initializeChatMessagesFromDb: any;

  public chatMsg: string = '';
  private chatList: any;

  public stylesForChatOfCurrentUser: string =
    'width: fit-content; margin: 1vh 0 1vh auto; padding: 5px 10px; background-color: rgb(233, 128, 8); color: white; border-radius: 5px; box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);';
  public stylesForChatOfOtherUser: string =
    'width: fit-content; margin: 1vh; padding: 5px 10px; background-color: rgb(245, 245, 245); border-radius: 5px; box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);';

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
      if (
        this.chatRoom.data?.data?.users.includes(
          this.chatRoom.data.currentUser && this.params.username
        )
      ) {
        this.chatList = this.ref.nativeElement.querySelector('.chat-list');
        this.chatList.insertAdjacentHTML(
          'beforeend',
          `<li style="${
            msg.usernameOfChatUser === this.params.username
              ? this.stylesForChatOfCurrentUser
              : this.stylesForChatOfOtherUser
          }">${msg.text}</li>`
        );
      }
    });
  }

  sendMessage() {
    this.socket.sendMessage({
      message: { usernameOfChatUser: this.params.username, text: this.chatMsg },
      room: this.params.roomId,
    });
  }

  setStyleForChatMessage(msg: any) {
    return msg.usernameOfChatUser === this.params.username
      ? this.stylesForChatOfCurrentUser
      : this.stylesForChatOfOtherUser;
  }
}

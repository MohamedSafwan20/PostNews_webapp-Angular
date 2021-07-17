import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server/server.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  // chatMsg: string = '';
  // chatList: any;
  public response: any;

  public isQueryStringExists: boolean = false;

  private chatRoom: any;

  constructor(
    private socket: SocketService,
    private ref: ElementRef,
    private server: ServerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    // this.socket.connect();
    this.response = await this.server.getUsersExceptCurrentUser();

    this.activatedRoute.queryParams.subscribe((params) => {
      params.username
        ? (this.isQueryStringExists = true)
        : (this.isQueryStringExists = false);
    });
  }

  async initializeChatScreen(user: any) {
    this.chatRoom = await this.server.checkChatRoomExists({
      usernameOfChatUser: user.username,
    });

    if (this.chatRoom.success) {
      this.router.navigate(['/chat'], {
        queryParams: {
          username: user.username,
          roomId: this.chatRoom.data._id,
        },
      });
    } else {
      this.chatRoom = await this.server.createChatRoom({
        usernameOfChatUser: user.username,
      });
      if (this.chatRoom.success) {
        this.router.navigate(['/chat'], {
          queryParams: {
            username: user.username,
            roomId: this.chatRoom.id,
          },
        });
      }
    }
  }

  // sendMessage() {
  //   this.socket.sendMessage({ username: 'safwan', message: this.chatMsg });
  //   this.chatList = this.ref.nativeElement.querySelector('.chat-list');
  //   this.chatList.insertAdjacentHTML('beforeend', `<li>${this.chatMsg}</li>`);
  // }

  // ngOnDestroy() {
  //   this.socket.disconnect();
  // }
}

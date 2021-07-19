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
  public response: any;

  public isQueryStringExists: boolean = false;

  public chatRoom: any;

  constructor(
    private socket: SocketService,
    private server: ServerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    socket.connect();
  }

  async ngOnInit() {
    // For listing users in chat except the current user
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
      this.socket.joinRoom(this.chatRoom.data.data._id);
      this.router.navigate(['/chat'], {
        queryParams: {
          username: user.username,
          roomId: this.chatRoom.data.data._id,
        },
      });
    } else {
      this.chatRoom = await this.server.createChatRoom({
        usernameOfChatUser: user.username,
      });
      if (this.chatRoom.success) {
        this.socket.joinRoom(this.chatRoom.data.id);
        this.router.navigate(['/chat'], {
          queryParams: {
            username: user.username,
            roomId: this.chatRoom.data.id,
          },
        });
      }
    }
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}

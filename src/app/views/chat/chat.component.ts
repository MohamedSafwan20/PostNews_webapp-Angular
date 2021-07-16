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

  constructor(
    private socket: SocketService,
    private ref: ElementRef,
    private server: ServerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    // this.socket.connect();
    this.response = await this.server.getUsers();
    this.activatedRoute.queryParams.subscribe((params) => {
      params.username
        ? (this.isQueryStringExists = true)
        : (this.isQueryStringExists = false);
    });
  }

  sendCurrentUser(user: any) {
    this.router.navigate(['/chat'], {
      queryParams: { username: user.username },
    });
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

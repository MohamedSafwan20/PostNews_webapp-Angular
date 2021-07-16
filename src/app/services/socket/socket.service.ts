import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor() {}

  connect() {
    this.socket = io(environment.SOCKET_SERVER_URL);

    this.socket.on('broadcast', (msg: string) => console.log(msg));
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  sendMessage(data: object) {
    this.socket.emit('msg', data);
  }
}

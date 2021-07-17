import { ServerService } from './../server/server.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  private response: any;

  constructor(private server: ServerService) {}

  connect() {
    this.socket = io(environment.SOCKET_SERVER_URL);
  }

  joinRoom(room: string) {
    this.socket.emit('join', room);
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  getLiveMessage() {
    return new Observable<any>((observer) => {
      this.socket.on('new message', (msg: any) => {
        observer.next(msg);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}

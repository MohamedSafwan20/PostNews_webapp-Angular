import { ServerService } from './../../services/server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private server: ServerService) {}

  ngOnInit(): void {}

  onClick() {
    this.server.connect().subscribe((res) => console.log(res));
  }
}

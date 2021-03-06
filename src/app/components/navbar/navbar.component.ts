import { ServerService } from 'src/app/services/server/server.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() page: String = '';

  constructor(public server: ServerService) {}

  ngOnInit(): void {}
}

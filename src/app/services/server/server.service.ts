import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient) {}

  connect(): Observable<Object> {
    return this.http.get('http://localhost:3000/');
  }
}

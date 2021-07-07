import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private SERVER_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async signUserUp(data: any) {
    let usernameAlreadyExistsError: string = '';
    await this.http
      .post(`${this.SERVER_URL}/signup`, data)
      .toPromise()
      .catch((err) => {
        if (err.error === 'Username already exists!')
          usernameAlreadyExistsError = err.usernameAlreadyExistsError;
      });
    return usernameAlreadyExistsError;
  }
}

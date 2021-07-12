import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private router: Router) {}

  refresh(url: string) {
    this.router
      .navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => {
        this.router.navigateByUrl(url);
      });
  }
}

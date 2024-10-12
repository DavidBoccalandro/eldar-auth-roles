import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  startLoading() {
    this.requestCount++;
    this.loadingSub.next(true);
  }

  stopLoading() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.loadingSub.next(false);
    }
  }
}

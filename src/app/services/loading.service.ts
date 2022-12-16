import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  startLoading = new Subject<boolean>();
  castStartLoading = this.startLoading.asObservable();

  sendStartLoading(flag: boolean){
    this.startLoading.next(flag);
  }

  stopLoading = new Subject<boolean>();
  castStopLoading = this.stopLoading.asObservable();

  sendStopLoading(flag: boolean){
    this.startLoading.next(flag);
  }
}

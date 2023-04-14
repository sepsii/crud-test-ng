import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: HotToastService) { }
  success(text, duration) {
    this.toast.success(text, { duration: duration })
  }

  error(text, duration) {
    this.toast.error(text, { duration: duration })

  }
}

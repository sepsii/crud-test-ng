import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: HotToastService) { }
  success(text: string, duration: number) {
    this.toast.success(text, { duration: duration })
  }

  error(text: string, duration: number) {
    this.toast.error(text, { duration: duration })

  }
}

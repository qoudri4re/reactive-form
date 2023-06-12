import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  successNotification(message: string) {
    this.toastr.success('Success!', message);
  }

  errorNotification(message: string) {
    this.toastr.error('Error!', message);
  }
}

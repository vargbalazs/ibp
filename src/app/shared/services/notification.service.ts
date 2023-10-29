import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CustomNotifyComponent } from '../components/custom-notify/custom-notify.component';

@Injectable({ providedIn: 'root' })
export class CustomNotificationService {
  constructor(private notificationService: NotificationService) {}

  showNotification(
    hideAfter: number,
    type: 'none' | 'success' | 'warning' | 'error' | 'info',
    title: string,
    descr: string
  ) {
    const notifyRef = this.notificationService.show({
      content: CustomNotifyComponent,
      hideAfter: hideAfter,
      position: { horizontal: 'right', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { icon: false },
    });

    const contentComponent = notifyRef!.content!
      .instance as CustomNotifyComponent;
    contentComponent.title = title;
    contentComponent.descr = descr;
    contentComponent.type = type;

    if (notifyRef) {
      notifyRef!.content!.instance.close.subscribe(() => notifyRef.hide());
    }
  }
}

import { Injectable, ViewContainerRef } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CustomNotifyComponent } from '../components/custom-notify/custom-notify.component';
import { CustomNotifyCompactComponent } from '../components/custom-notify-compact/custom-notify-compact.component';

@Injectable({ providedIn: 'root' })
export class CustomNotificationService {
  constructor(private notificationService: NotificationService) {}

  showNotification(
    content: 'normal' | 'compact',
    hideAfter: number,
    type: 'none' | 'success' | 'warning' | 'error' | 'info',
    title: string,
    descr: string,
    appendTo?: ViewContainerRef
  ) {
    const notifyRef = this.notificationService.show({
      content:
        content === 'normal'
          ? CustomNotifyComponent
          : CustomNotifyCompactComponent,
      hideAfter: hideAfter,
      position: { horizontal: 'right', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { icon: false },
      appendTo: appendTo,
    });

    const contentComponent =
      content === 'normal'
        ? (notifyRef!.content!.instance as CustomNotifyComponent)
        : (notifyRef!.content!.instance as CustomNotifyCompactComponent);
    contentComponent.title = title;
    contentComponent.descr = descr;
    contentComponent.type = type;

    if (notifyRef) {
      notifyRef!.content!.instance.close.subscribe(() => notifyRef.hide());
    }
  }
}

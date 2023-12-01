import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminService } from 'src/app/features/admin/services/admin.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

export function routeGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const adminService = inject(AdminService);
    const notifyService = inject(CustomNotificationService);
    const allowed = adminService.hasRoute(route.url.join('/'));

    if (!allowed)
      notifyService.showNotification(
        'normal',
        5000,
        'error',
        'Hiba',
        'Nincs jogosultságod a kért tartalom megtekintéséhez'
      );

    return allowed;
  };
}

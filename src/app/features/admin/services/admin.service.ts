import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { Constraint } from 'src/app/shared/interfaces/constraint.interface';

@Injectable()
export class AdminService {
  private currentUser: BehaviorSubject<User>;
  private editedUser: BehaviorSubject<User>;
  private notifyService: CustomNotificationService;

  constructor() {
    this.currentUser = new BehaviorSubject<User>(new User());
    this.editedUser = new BehaviorSubject<User>(new User());
    this.notifyService = inject(CustomNotificationService);
  }

  public setUser(user: User) {
    this.currentUser.next(user);
  }

  public getUser(): User {
    return this.currentUser.getValue();
  }

  public setEditedUser(user: User) {
    this.editedUser.next(user);
  }

  public getEditedUser(): User {
    return this.editedUser.getValue();
  }

  public isAdmin(): boolean {
    return !!this.currentUser
      .getValue()
      .roleGroups?.find((roleGroup) => roleGroup.name === 'ADMIN');
  }

  public hasRoute(routePath: string): boolean {
    let found = false;
    for (let roleGroup of this.currentUser.getValue().roleGroups!) {
      found = !!roleGroup.routes?.find((route) => route.name === routePath);
    }
    return found;
  }

  public hasPermission(permission: string): boolean {
    let found = false;
    for (let roleGroup of this.currentUser.getValue().roleGroups!) {
      for (let role of roleGroup.roles!) {
        found = !!role.permissions?.find((perm) => perm.name === permission);
        break;
      }
    }
    if (!found && !this.isAdmin()) {
      this.notifyService.showNotification(
        'normal',
        5000,
        'error',
        'Hiba',
        'Nincs jogosultságod a kért művelet elvégzéséhez.'
      );
    }

    return found || this.isAdmin();
  }

  public hasConstraint(constraint: Constraint): boolean {
    const constraints = this.currentUser.getValue().constraints;
    if (constraints) {
      let value = constraints.find(
        (userConstr) =>
          userConstr.objectField === constraint.objectField &&
          userConstr.objectName === constraint.objectName
      )?.objectValue;

      let accessedValue = constraint.dataItem[constraint.objectField];

      if (value) {
        let hasAccess = value === accessedValue.toString();

        if (!hasAccess) {
          this.notifyService.showNotification(
            'normal',
            5000,
            'error',
            'Hiba',
            'Nincs jogosultságod a kért művelet elvégzéséhez.'
          );
        }

        return hasAccess;
      }
    }

    return true;
  }
}

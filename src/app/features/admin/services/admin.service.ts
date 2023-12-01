import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class AdminService {
  private currentUser: BehaviorSubject<User>;

  constructor() {
    this.currentUser = new BehaviorSubject<User>(new User());
  }

  public setUser(user: User) {
    this.currentUser.next(user);
  }

  public getUser(): User {
    return this.currentUser.getValue();
  }

  public isAdmin(): boolean {
    return !!this.currentUser
      .getValue()
      .roleGroups?.find((roleGroup) => roleGroup.name === 'ADMIN');
  }

  public hasRoute(routePath: string): boolean {
    let found = false;
    this.currentUser.getValue().roleGroups?.forEach((roleGroup) => {
      found = !!roleGroup.routes?.find((route) => route.name === routePath);
    });
    return found;
  }
}

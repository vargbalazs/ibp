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
}

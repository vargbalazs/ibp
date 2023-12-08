import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/features/admin/models/user.model';
import { of } from 'rxjs';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  add(user: User) {
    return of(user);
  }

  update(user: User) {
    return of(user);
  }

  delete(id: string, permission: string) {
    return this.http.delete<number>(`${API_URL}/users`, {
      params: new HttpParams().set('userId', id),
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getUsers(permission: string) {
    return this.http.get<User[]>(`${API_URL}/users`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  updateAsAdmin(user: User, permission: string) {
    return this.http.put<User>(`${API_URL}/users/${user.userId}`, user, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getUserWithRoleGroups(user: User) {
    return this.http.get<User>(
      `${API_URL}/users/user-with-rolegroups-and-permissions/${user.userId}`
    );
  }
}

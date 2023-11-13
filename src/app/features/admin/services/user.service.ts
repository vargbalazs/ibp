import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { of } from 'rxjs';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  add(user: User) {
    return of(user);
  }

  update(user: User) {
    return of(user);
  }

  delete(id: string) {
    return this.http.delete<number>(`${API_URL}/users`, {
      params: new HttpParams().set('userId', id),
    });
  }

  getUsers() {
    return this.http.get<User[]>(`${API_URL}/users`);
  }
}

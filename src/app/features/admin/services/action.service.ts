import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Action } from '../models/action.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class ActionService implements Repository<Action> {
  constructor(private http: HttpClient) {}

  add(action: Action, permission: string) {
    return this.http.post<Action>(`${API_URL}/actions`, action, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(action: Action, permission: string) {
    return this.http.put<Action>(`${API_URL}/actions/${action.id}`, action, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/actions/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getActions(permission: string) {
    return this.http.get<Action[]>(`${API_URL}/actions`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}

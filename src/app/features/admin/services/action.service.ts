import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Action } from '../models/action.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class ActionService implements Repository<Action> {
  constructor(private http: HttpClient) {}

  add(action: Action) {
    return this.http.post<Action>(`${API_URL}/actions`, action);
  }

  update(action: Action) {
    return this.http.put<Action>(`${API_URL}/actions/${action.id}`, action);
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/actions/${id}`);
  }

  getActions() {
    return this.http.get<Action[]>(`${API_URL}/actions`);
  }
}

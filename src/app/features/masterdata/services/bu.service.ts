import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Bu } from '../models/bu.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class BuService implements Repository<Bu> {
  constructor(private http: HttpClient) {}

  add(bu: Bu) {
    return this.http.post<Bu>(`${API_URL}/bus`, bu);
  }

  update(bu: Bu) {
    return this.http.put<Bu>(`${API_URL}/bus/${bu.id}`, bu);
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/bus/${id}`);
  }

  getBus() {
    return this.http.get<Bu[]>(`${API_URL}/bus`);
  }
}

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Bu } from '../models/bu.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class BuService implements Repository<Bu> {
  constructor(private http: HttpClient) {}

  add(bu: Bu, permission: string) {
    return this.http.post<Bu>(`${API_URL}/bus`, bu, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(bu: Bu, permission: string) {
    return this.http.put<Bu>(`${API_URL}/bus/${bu.id}`, bu, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/bus/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getBus(permission: string) {
    return this.http.get<Bu[]>(`${API_URL}/bus`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}

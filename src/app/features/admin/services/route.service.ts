import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Route } from '../models/route.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class RouteService implements Repository<Route> {
  constructor(private http: HttpClient) {}

  add(route: Route, permission: string) {
    return this.http.post<Route>(`${API_URL}/routes`, route, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(route: Route, permission: string) {
    return this.http.put<Route>(`${API_URL}/routes/${route.id}`, route, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/routes/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getRoutes(permission: string) {
    return this.http.get<Route[]>(`${API_URL}/routes`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}

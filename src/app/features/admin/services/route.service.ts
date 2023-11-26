import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Route } from '../models/route.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class RouteService implements Repository<Route> {
  constructor(private http: HttpClient) {}

  add(route: Route) {
    return this.http.post<Route>(`${API_URL}/routes`, route);
  }

  update(route: Route) {
    return this.http.put<Route>(`${API_URL}/routes/${route.id}`, route);
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/routes/${id}`);
  }

  getRoutes() {
    return this.http.get<Route[]>(`${API_URL}/routes`);
  }
}

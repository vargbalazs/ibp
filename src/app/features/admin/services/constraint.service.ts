import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Constraint } from '../models/constraint.model';
import {
  API_URL,
  NOTIFICATION_TYPE,
  PERMISSION,
} from 'src/app/core/constants/app.constants';
import { ContainerService } from 'src/app/shared/services/container.service';

@Injectable()
export class ConstraintService implements Repository<Constraint> {
  constructor(
    private http: HttpClient,
    private containerService: ContainerService
  ) {}

  add(constraint: Constraint, permission: string) {
    return this.http.post<Constraint>(`${API_URL}/constraints`, constraint, {
      context: new HttpContext()
        .set(PERMISSION, permission)
        .set(NOTIFICATION_TYPE, {
          type: 'compact',
          container: this.containerService.getContainer(),
        }),
    });
  }

  update(constraint: Constraint, permission: string) {
    return this.http.put<Constraint>(
      `${API_URL}/constraints/${constraint.id}`,
      constraint,
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/constraints/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getConstraints(permission: string) {
    return this.http.get<Constraint[]>(`${API_URL}/constraints`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}

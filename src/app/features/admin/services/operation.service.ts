import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Operation } from '../models/operation.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class OperationService implements Repository<Operation> {
  constructor(private http: HttpClient) {}

  add(operation: Operation, permission: string) {
    return this.http.post<Operation>(`${API_URL}/operations`, operation, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(operation: Operation, permission: string) {
    return this.http.put<Operation>(
      `${API_URL}/operations/${operation.id}`,
      operation,
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/operations/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getOperations(permission: string) {
    return this.http.get<Operation[]>(`${API_URL}/operations/with-submodules`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}

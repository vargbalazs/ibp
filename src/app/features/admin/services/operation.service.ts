import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Operation } from '../models/operation.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class OperationService implements Repository<Operation> {
  constructor(private http: HttpClient) {}

  add(operation: Operation) {
    return this.http.post<Operation>(`${API_URL}/operations`, operation);
  }

  update(operation: Operation) {
    return this.http.put<Operation>(
      `${API_URL}/operations/${operation.id}`,
      operation
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/operations/${id}`);
  }

  getOperations() {
    return this.http.get<Operation[]>(`${API_URL}/operations`);
  }
}

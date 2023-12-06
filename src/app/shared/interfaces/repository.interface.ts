import { Observable } from 'rxjs';

export interface Repository<T> {
  add?(entity: Omit<T, 'id'>, permission?: string): Observable<T>;
  addEntities?(entities: T[]): Observable<number>;
  update?(entity: T): Observable<T>;
  updateEntities?(entities: T[]): Observable<number>;
  delete?(id: number | string): Observable<number>;
}

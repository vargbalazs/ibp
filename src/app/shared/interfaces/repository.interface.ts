import { Observable } from 'rxjs';

export interface Repository<T> {
  add?(entity: T): Observable<T>;
  addEntities?(entities: T[]): Observable<number>;
  update?(entity: T): Observable<T>;
  updateEntities?(entities: T[]): Observable<number>;
  delete?(id: number): Observable<number>;
}

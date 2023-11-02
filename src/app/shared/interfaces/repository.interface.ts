import { Observable } from 'rxjs';

export interface Repository<T> {
  add?(entity: T): Observable<number>;
  addEntities?(entities: T[]): Observable<number>;
  update?(entity: T): Observable<number>;
  updateEntities?(entities: T[]): Observable<number>;
  delete?(id: number): Observable<number>;
}

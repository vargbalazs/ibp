import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { SubModule } from '../models/submodule.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class SubModuleService implements Repository<SubModule> {
  constructor(private http: HttpClient) {}

  add(subModule: SubModule) {
    return this.http.post<SubModule>(`${API_URL}/sub-modules`, subModule);
  }

  update(subModule: SubModule) {
    return this.http.put<SubModule>(
      `${API_URL}/sub-modules/${subModule.id}`,
      subModule
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/sub-modules/${id}`);
  }

  getSubModules() {
    return this.http.get<SubModule[]>(`${API_URL}/sub-modules`);
  }
}

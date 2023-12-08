import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { SubModule } from '../models/submodule.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class SubModuleService implements Repository<SubModule> {
  constructor(private http: HttpClient) {}

  add(subModule: SubModule, permission: string) {
    return this.http.post<SubModule>(`${API_URL}/sub-modules`, subModule, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(subModule: SubModule, permission: string) {
    return this.http.put<SubModule>(
      `${API_URL}/sub-modules/${subModule.id}`,
      subModule,
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/sub-modules/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getSubModules(permission: string) {
    return this.http.get<SubModule[]>(`${API_URL}/sub-modules`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}

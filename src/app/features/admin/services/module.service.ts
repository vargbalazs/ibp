import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Module } from '../models/module.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class ModuleService implements Repository<Module> {
  constructor(private http: HttpClient) {}

  add(module: Module, permission: string) {
    return this.http.post<Module>(`${API_URL}/modules`, module, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(module: Module, permission: string) {
    return this.http.put<Module>(`${API_URL}/modules/${module.id}`, module, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/modules/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getModules(permission: string) {
    return this.http.get<Module[]>(`${API_URL}/modules`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getModulesWithSubModules(permission: string) {
    return this.http.get<Module[]>(`${API_URL}/modules/with-submodules`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}

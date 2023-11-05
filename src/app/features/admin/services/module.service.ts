import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Module } from '../models/module.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class ModuleService implements Repository<Module> {
  constructor(private http: HttpClient) {}

  add(module: Module) {
    return this.http.post<Module>(`${API_URL}/modules`, module);
  }

  update(module: Module) {
    return this.http.put<Module>(`${API_URL}/modules/${module.id}`, module);
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/modules/${id}`);
  }

  getModules() {
    return this.http.get<Module[]>(`${API_URL}/modules`);
  }

  getModulesWithSubModules() {
    return this.http.get<Module[]>(`${API_URL}/modules/with-submodules`);
  }
}

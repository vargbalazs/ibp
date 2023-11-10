import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Role } from '../models/role.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class RoleService implements Repository<Role> {
  constructor(private http: HttpClient) {}

  add(role: Role) {
    return this.http.post<Role>(`${API_URL}/roles`, role);
  }

  update(role: Role) {
    return this.http.put<Role>(`${API_URL}/roles/${role.id}`, role);
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/roles/${id}`);
  }

  getRoles() {
    return this.http.get<Role[]>(`${API_URL}/roles`);
  }

  assignToRoleGroup(roleGroupId: number, roleId: number) {
    return this.http.post<boolean>(`${API_URL}/roles/assign-to-rolegroup`, {
      roleGroupId: roleGroupId,
      roleId: roleId,
    });
  }

  removeFromRoleGroup(roleGroupId: number, roleId: number) {
    return this.http.post<boolean>(`${API_URL}/roles/remove-from-rolegroup`, {
      roleGroupId: roleGroupId,
      roleId: roleId,
    });
  }
}

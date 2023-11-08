import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Permission } from '../models/permission.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class PermissionService implements Repository<Permission> {
  constructor(private http: HttpClient) {}

  add(permission: Permission) {
    return this.http.post<Permission>(`${API_URL}/permissions`, permission);
  }

  update(permission: Permission) {
    return this.http.put<Permission>(
      `${API_URL}/permissions/${permission.id}`,
      permission
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/permissions/${id}`);
  }

  assignToRole(roleId: number, permissionId: number) {
    return this.http.post<boolean>(`${API_URL}/permissions/assign-to-role`, {
      roleId: roleId,
      permissionId: permissionId,
    });
  }

  removeFromRole(roleId: number, permissionId: number) {
    return this.http.post<boolean>(`${API_URL}/permissions/remove-from-role`, {
      roleId: roleId,
      permissionId: permissionId,
    });
  }
}

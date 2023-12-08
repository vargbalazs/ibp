import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Permission } from '../models/permission.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class PermissionService implements Repository<Permission> {
  constructor(private http: HttpClient) {}

  add(permission: Permission, perm: string) {
    return this.http.post<Permission>(`${API_URL}/permissions`, permission, {
      context: new HttpContext().set(PERMISSION, perm),
    });
  }

  update(permission: Permission, perm: string) {
    return this.http.put<Permission>(
      `${API_URL}/permissions/${permission.id}`,
      permission,
      {
        context: new HttpContext().set(PERMISSION, perm),
      }
    );
  }

  delete(id: number, perm: string) {
    return this.http.delete<number>(`${API_URL}/permissions/${id}`, {
      context: new HttpContext().set(PERMISSION, perm),
    });
  }

  assignToRole(roleId: number, permissionId: number, perm: string) {
    return this.http.post<boolean>(
      `${API_URL}/permissions/assign-to-role`,
      {
        roleId: roleId,
        permissionId: permissionId,
      },
      {
        context: new HttpContext().set(PERMISSION, perm),
      }
    );
  }

  removeFromRole(roleId: number, permissionId: number, perm: string) {
    return this.http.post<boolean>(
      `${API_URL}/permissions/remove-from-role`,
      {
        roleId: roleId,
        permissionId: permissionId,
      },
      {
        context: new HttpContext().set(PERMISSION, perm),
      }
    );
  }

  getPermissions(perm: string) {
    return this.http.get<Permission[]>(`${API_URL}/permissions`, {
      context: new HttpContext().set(PERMISSION, perm),
    });
  }

  getPermissionsWithDetails(perm: string) {
    return this.http.get<Permission[]>(`${API_URL}/permissions/with-details`, {
      context: new HttpContext().set(PERMISSION, perm),
    });
  }
}

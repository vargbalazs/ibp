import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Role } from '../models/role.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class RoleService implements Repository<Role> {
  constructor(private http: HttpClient) {}

  add(role: Role, permission: string) {
    return this.http.post<Role>(`${API_URL}/roles`, role, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(role: Role, permission: string) {
    return this.http.put<Role>(`${API_URL}/roles/${role.id}`, role, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/roles/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getRoles(permission: string) {
    return this.http.get<Role[]>(`${API_URL}/roles`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getRolesWithPermissions(permission: string) {
    return this.http.get<Role[]>(`${API_URL}/roles/roles-with-permissions`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  assignToRoleGroup(roleGroupId: number, roleId: number, permission: string) {
    return this.http.post<boolean>(
      `${API_URL}/roles/assign-to-rolegroup`,
      {
        roleGroupId: roleGroupId,
        roleId: roleId,
      },
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  removeFromRoleGroup(roleGroupId: number, roleId: number, permission: string) {
    return this.http.post<boolean>(
      `${API_URL}/roles/remove-from-rolegroup`,
      {
        roleGroupId: roleGroupId,
        roleId: roleId,
      },
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }
}

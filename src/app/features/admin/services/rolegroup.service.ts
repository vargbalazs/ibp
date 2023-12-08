import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, ViewContainerRef } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { RoleGroup } from '../models/rolegroup.model';
import {
  API_URL,
  NOTIFICATION_TYPE,
  PERMISSION,
} from 'src/app/core/constants/app.constants';

@Injectable()
export class RoleGroupService implements Repository<RoleGroup> {
  constructor(private http: HttpClient) {}

  add(roleGroup: RoleGroup, permission: string) {
    return this.http.post<RoleGroup>(`${API_URL}/role-groups`, roleGroup, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(roleGroup: RoleGroup, permission: string) {
    return this.http.put<RoleGroup>(
      `${API_URL}/role-groups/${roleGroup.id}`,
      roleGroup,
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/role-groups/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getRoleGroups(permission: string) {
    return this.http.get<RoleGroup[]>(`${API_URL}/role-groups`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getRoleGroupsWithPermissions(permission: string) {
    return this.http.get<RoleGroup[]>(
      `${API_URL}/role-groups/rolegroups-with-permissions`,
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  assignRoleGroupToUser(
    roleGroupId: number,
    userId: string,
    container: ViewContainerRef,
    permission: string
  ) {
    return this.http.post<boolean>(
      `${API_URL}/role-groups/assign-to-user`,
      {
        roleGroupId: roleGroupId,
        userId: userId,
      },
      {
        context: new HttpContext()
          .set(NOTIFICATION_TYPE, {
            type: 'compact',
            container: container,
          })
          .set(PERMISSION, permission),
      }
    );
  }

  removeRoleGroupFromUser(
    roleGroupId: number,
    userId: string,
    container: ViewContainerRef,
    permission: string
  ) {
    return this.http.post<boolean>(
      `${API_URL}/role-groups/remove-from-user`,
      {
        roleGroupId: roleGroupId,
        userId: userId,
      },
      {
        context: new HttpContext()
          .set(NOTIFICATION_TYPE, {
            type: 'compact',
            container: container,
          })
          .set(PERMISSION, permission),
      }
    );
  }

  assignRoleGroupToRoute(
    roleGroupId: number,
    routeId: number,
    permission: string
  ) {
    return this.http.post<boolean>(
      `${API_URL}/role-groups/assign-to-route`,
      {
        roleGroupId: roleGroupId,
        routeId: routeId,
      },
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  removeRoleGroupFromRoute(
    roleGroupId: number,
    routeId: number,
    permission: string
  ) {
    return this.http.post<boolean>(
      `${API_URL}/role-groups/remove-from-route`,
      {
        roleGroupId: roleGroupId,
        routeId: routeId,
      },
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { RoleGroup } from '../models/rolegroup.model';
import { API_URL } from 'src/app/core/constants/app.constants';

@Injectable()
export class RoleGroupService implements Repository<RoleGroup> {
  constructor(private http: HttpClient) {}

  add(roleGroup: RoleGroup) {
    return this.http.post<RoleGroup>(`${API_URL}/role-groups`, roleGroup);
  }

  update(roleGroup: RoleGroup) {
    return this.http.put<RoleGroup>(
      `${API_URL}/role-groups/${roleGroup.id}`,
      roleGroup
    );
  }

  delete(id: number) {
    return this.http.delete<number>(`${API_URL}/role-groups/${id}`);
  }

  getRoleGroups() {
    return this.http.get<RoleGroup[]>(`${API_URL}/role-groups`);
  }

  assignRoleGroupToUser(roleGroupId: number, userId: string) {
    return this.http.post<boolean>(`${API_URL}/role-groups/assign-to-user`, {
      roleGroupId: roleGroupId,
      userId: userId,
    });
  }

  removeRoleGroupFromUser(roleGroupId: number, userId: string) {
    return this.http.post<boolean>(`${API_URL}/role-groups/remove-from-user`, {
      roleGroupId: roleGroupId,
      userId: userId,
    });
  }
}

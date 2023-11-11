import { Role } from './role.model';
import { RoleGroup } from './rolegroup.model';

export class AssignRole {
  constructor(
    public id?: number,
    public roleId?: number,
    public roleGroupId?: number,
    public role?: Role,
    public roleGroup?: RoleGroup
  ) {}
}

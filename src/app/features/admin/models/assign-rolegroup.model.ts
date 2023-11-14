import { RoleGroup } from './rolegroup.model';

export class AssignRoleGroup {
  constructor(
    public id?: number,
    public roleId?: number,
    public roleGroupId?: number,
    public roleGroup?: RoleGroup
  ) {}
}

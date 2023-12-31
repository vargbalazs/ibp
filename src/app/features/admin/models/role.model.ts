import { Permission } from './permission.model';
import { RoleGroup } from './rolegroup.model';

export class Role {
  constructor(
    public id?: number,
    public name?: string,
    public roleGroups?: RoleGroup[],
    public roleGroupId?: number,
    public permissions?: Permission[]
  ) {}
}

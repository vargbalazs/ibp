import { RoleGroup } from './rolegroup.model';

export class AssignRoute {
  constructor(
    public id?: number,
    public roleGroupId?: number,
    public roleGroup?: RoleGroup,
    public routeId?: number
  ) {}
}

import { RoleGroup } from './rolegroup.model';
import { Route } from './route.model';

export class AssignRoute {
  constructor(
    public id?: number,
    public roleGroupId?: number,
    public roleGroup?: RoleGroup,
    public routeId?: number,
    public route?: Route
  ) {}
}

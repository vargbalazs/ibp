import { Role } from './role.model';
import { Route } from './route.model';

export class RoleGroup {
  constructor(
    public id?: number,
    public name?: string,
    public roles?: Role[],
    public routes?: Route[]
  ) {}
}

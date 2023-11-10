import { Role } from './role.model';

export class RoleGroup {
  constructor(
    public id?: number,
    public name?: string,
    public roles?: Role[]
  ) {}
}

import { Permission } from './permission.model';
import { Role } from './role.model';

export class AssignPermission {
  constructor(
    public id?: number,
    public roleId?: number,
    public role?: Role,
    public permissionId?: number,
    public permission?: Permission
  ) {}
}

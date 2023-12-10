import { Role } from './role.model';

export class Constraint {
  constructor(
    public id?: number,
    public name?: string,
    public objectName?: string,
    public objectField?: string,
    public objectValue?: string,
    public role?: Role,
    public userId?: string
  ) {}
}

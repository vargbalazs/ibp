import { Operation } from './operation.model';
//import { Role } from './role.model';

export class Permission {
  constructor(
    public id?: number,
    public name?: string,
    public operation?: Operation //public roles?: Role[]
  ) {}
}

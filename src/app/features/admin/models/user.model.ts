import { RoleGroup } from './rolegroup.model';

export class User {
  constructor(
    public id?: number,
    public userId?: string,
    public firstName?: string,
    public lastName?: string,
    public userName?: string,
    public currentUserName?: string,
    public userEmail?: string,
    public password?: string,
    public lastLoginDate?: Date,
    public joinDate?: Date,
    public active?: boolean,
    public notLocked?: boolean,
    public firstLogin?: boolean,
    public roleGroups?: RoleGroup[],
    public allRoleGroups?: RoleGroup[]
  ) {}
}

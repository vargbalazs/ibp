import { RoleGroup } from './rolegroup.model';

export class Route {
  constructor(
    public id: number = 0,
    public name: string = '',
    public roleGroups?: RoleGroup[]
  ) {}
}

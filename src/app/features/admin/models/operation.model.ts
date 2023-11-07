import { SubModule } from './submodule.model';

export class Operation {
  constructor(
    public id: number = 0,
    public name: string = '',
    public subModule?: SubModule,
    public permissions?: {}
  ) {}
}

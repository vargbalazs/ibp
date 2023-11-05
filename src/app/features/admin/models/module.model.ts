import { SubModule } from './submodule.model';

export class Module {
  constructor(
    public id: number = 0,
    public name: string = '',
    public subModules: SubModule[] = []
  ) {}
}

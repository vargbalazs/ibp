import { Module } from './module.model';
import { SubModule } from './submodule.model';

export class Operation {
  constructor(
    public id?: number,
    public name?: string,
    public subModule?: SubModule,
    public permissions?: {},
    public module?: Module
  ) {}
}

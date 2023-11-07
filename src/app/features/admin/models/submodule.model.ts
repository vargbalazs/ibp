import { Module } from './module.model';
import { Operation } from './operation.model';

export class SubModule {
  constructor(
    public id: number = 0,
    public name: string = '',
    public module: Module = { id: 0, name: '', subModules: [] },
    // placeholder property for the operations
    // it must be called 'subModules' because of the treeview generation algorithm
    public subModules?: Operation[]
  ) {}
}

import { Module } from './module.model';

export class SubModule {
  constructor(
    public id: number = 0,
    public name: string = '',
    public module: Module = { id: 0, name: '', subModules: [] }
  ) {}
}

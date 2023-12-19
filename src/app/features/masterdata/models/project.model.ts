import { Customer } from './customer.model';

export class Project {
  constructor(
    public id: number = 0,
    public name: string = '',
    public customer?: Customer
  ) {}
}

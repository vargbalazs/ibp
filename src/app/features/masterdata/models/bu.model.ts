import { Customer } from './customer.model';

export class Bu {
  constructor(
    public id: number = 0,
    public name: string = '',
    public customers?: Customer[]
  ) {}
}

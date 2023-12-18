import { Bu } from './bu.model';

export class Customer {
  constructor(
    public id: number = 0,
    public name: string = '',
    public code: string = '',
    public bu: Bu = { id: 0, name: '', customers: [] }
  ) {}
}

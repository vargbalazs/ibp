import { Field } from './field.interface';

export interface Table {
  name: string;
  fields: Field[];
}

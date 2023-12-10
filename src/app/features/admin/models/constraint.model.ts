import { Table } from 'src/app/core/interfaces/table.interface';
import { Role } from './role.model';
import { Field } from 'src/app/core/interfaces/field.interface';

export class Constraint {
  constructor(
    public id?: number,
    public name?: string,
    public objectName?: string,
    public objectField?: string,
    public objectValue?: string,
    public role?: Role,
    public userId?: string,
    public object?: Table,
    public field?: Field
  ) {}
}

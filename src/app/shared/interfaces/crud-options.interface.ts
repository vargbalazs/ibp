import { AlternativeId } from './alternative-id.interface';
import { Constraint } from './constraint.interface';

export interface CrudOptions {
  alternativeId?: AlternativeId;
  permission?: string;
  constraint?: Constraint;
}

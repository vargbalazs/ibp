import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AdminService } from '../../../services/admin.service';
import { Constraint } from '../../../models/constraint.model';
import { Role } from '../../../models/role.model';
import { Table } from 'src/app/core/interfaces/table.interface';
import { TABLES } from 'src/app/core/enums/tables/tables';
import { Field } from 'src/app/core/interfaces/field.interface';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'assign-constraint',
  templateUrl: './assign-constraint.component.html',
  styleUrls: ['./assign-constraint.component.css'],
})
export class AssignConstraintComponent
  extends CreateEditComponent<Constraint>
  implements OnInit, OnChanges
{
  isBusy: BehaviorSubject<boolean>;
  roles: Role[] = [];
  objects: Table[] = TABLES;
  fields: Field[] = [];

  override form: ReturnType<typeof this.initForm>;

  constructor(
    private loaderService: LoaderService,
    private adminService: AdminService,
    private utilityService: UtilityService
  ) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
    this.adminService.getUser().roleGroups?.forEach((roleGroup) => {
      roleGroup.roles?.forEach((role) => {
        if (!this.roles.some((r) => r.name === role.name))
          this.roles.push(role);
      });
    });
  }

  ngOnInit(): void {
    this.utilityService.changeControlState(
      this.form,
      ['objectField', 'objectValue'],
      false
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editMode) {
      this.comboBoxValueChange = true;
      this.objectChange(
        TABLES.filter(
          (table) => table.name === this.form.controls.objectName.value
        ).at(0)!
      );
      this.comboBoxValueChange = false;
    }
  }

  initForm() {
    return new FormGroup({
      id: new FormControl(this.formData.id),
      name: new FormControl(this.formData.name, [Validators.required]),
      objectName: new FormControl(this.formData.objectName, [
        Validators.required,
      ]),
      objectField: new FormControl(this.formData.objectField, [
        Validators.required,
      ]),
      objectValue: new FormControl(this.formData.objectValue, [
        Validators.required,
      ]),
      role: new FormControl(this.formData.role, [Validators.required]),
    });
  }

  objectChange(value: Table) {
    if (value) {
      this.fields = value.fields;
      setTimeout(() => {
        this.utilityService.changeControlState(
          this.form,
          ['objectField'],
          true
        );
      });
    } else {
      this.utilityService.changeControlState(
        this.form,
        ['objectField', 'objectValue'],
        false
      );
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ objectField: undefined });
      this.form.patchValue({ objectValue: '' });
    }
  }

  fieldChange(value: Field) {
    setTimeout(() => {
      this.utilityService.changeControlState(
        this.form,
        ['objectValue'],
        !!value
      );
    });
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ objectValue: '' });
    }
  }
}

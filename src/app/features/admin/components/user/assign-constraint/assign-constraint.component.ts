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
    this.adminService.getEditedUser().roleGroups?.forEach((roleGroup) => {
      roleGroup.roles?.forEach((role) => {
        if (!this.roles.some((r) => r.name === role.name)) {
          const copiedRole: Role = {};
          Object.assign(copiedRole, role);
          this.roles.push(copiedRole);
        }
      });
    });
  }

  ngOnInit(): void {
    this.utilityService.changeControlState(
      this.form,
      ['field', 'objectValue'],
      false
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editMode) {
      this.form.controls.object.setValue(
        this.objects.find(
          (table) => table.name === this.form.controls.objectName.value
        )
      );
      this.fields = this.form.controls.object.value?.fields!;
      this.form.controls.field.setValue(
        this.fields.find(
          (field) => field.name === this.form.controls.objectField.value
        )
      );
      this.comboBoxValueChange = true;
      this.objectChange(this.form.controls.object.value!);
      this.fieldChange(this.form.controls.field.value!);
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
      object: new FormControl(this.formData.object, [Validators.required]),
      field: new FormControl(this.formData.field, [Validators.required]),
    });
  }

  objectChange(value: Table) {
    if (value) {
      this.fields = value.fields;
      this.form.controls.objectName.setValue(value.name);
      setTimeout(() => {
        this.utilityService.changeControlState(this.form, ['field'], true);
      });
    } else {
      this.utilityService.changeControlState(
        this.form,
        ['field', 'objectValue'],
        false
      );
      this.form.patchValue({ field: undefined });
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ objectField: '' });
      this.form.patchValue({ objectValue: '' });
    }
  }

  fieldChange(value: Field) {
    if (value) this.form.controls.objectField.setValue(value.name);
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

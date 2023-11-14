import { Component, Input } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AssignRoleGroup } from '../../../models/assign-rolegroup.model';
import { RoleGroup } from '../../../models/rolegroup.model';

@Component({
  selector: 'assign-rolegroup',
  templateUrl: './assign-rolegroup.component.html',
  styleUrls: ['./assign-rolegroup.component.css'],
})
export class AssignRoleGroupComponent extends CreateEditComponent<AssignRoleGroup> {
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  @Input() roleGroups: RoleGroup[] = [];

  constructor(private loaderService: LoaderService) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  initForm() {
    return new FormGroup({
      roleId: new FormControl(this.formData.roleId, [Validators.required]),
      roleGroupId: new FormControl(this.formData.roleGroupId, [
        Validators.required,
      ]),
      roleGroup: new FormControl(this.formData.roleGroup, [
        Validators.required,
      ]),
    });
  }

  roleGroupChange(value: RoleGroup) {
    if (value) this.form.patchValue({ roleGroupId: value.id });
  }
}

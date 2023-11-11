import { Component, Input } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { AssignRole } from '../../../models/assign-role.model';
import { Role } from '../../../models/role.model';
import { RoleGroup } from '../../../models/rolegroup.model';
import { RoleService } from '../../../services/role.service';
import { RoleGroupService } from '../../../services/rolegroup.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'assign-to-rolegroup',
  templateUrl: './assign-to-rolegroup.component.html',
  styleUrls: ['./assign-to-rolegroup.component.css'],
})
export class AssignToRoleGroupComponent extends CreateEditComponent<AssignRole> {
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  @Input() roles: Role[] = [];
  @Input() roleGroups: RoleGroup[] = [];

  constructor(
    private roleService: RoleService,
    private roleGroupService: RoleGroupService,
    private loaderService: LoaderService
  ) {
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
      role: new FormControl(this.formData.role, [Validators.required]),
      roleGroup: new FormControl(this.formData.roleGroup, [
        Validators.required,
      ]),
    });
  }

  roleChange(value: Role) {
    if (value) this.form.patchValue({ roleId: value.id });
  }

  roleGroupChange(value: RoleGroup) {
    if (value) this.form.patchValue({ roleGroupId: value.id });
  }
}

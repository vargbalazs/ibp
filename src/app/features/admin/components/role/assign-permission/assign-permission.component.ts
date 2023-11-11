import { Component, Input } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { Role } from '../../../models/role.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AssignPermission } from '../../../models/assign-permission.model';
import { Permission } from '../../../models/permission.model';

@Component({
  selector: 'assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.css'],
})
export class AssignPermissionComponent extends CreateEditComponent<AssignPermission> {
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  @Input() permissions: Permission[] = [];
  @Input() roles: Role[] = [];

  constructor(private loaderService: LoaderService) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  initForm() {
    return new FormGroup({
      roleId: new FormControl(this.formData.roleId, [Validators.required]),
      permissionId: new FormControl(this.formData.permissionId, [
        Validators.required,
      ]),
      role: new FormControl(this.formData.role, [Validators.required]),
      permission: new FormControl(this.formData.permission, [
        Validators.required,
      ]),
    });
  }

  roleChange(value: Role) {
    if (value) this.form.patchValue({ roleId: value.id });
  }

  permissionChange(value: Permission) {
    if (value) this.form.patchValue({ permissionId: value.id });
  }
}

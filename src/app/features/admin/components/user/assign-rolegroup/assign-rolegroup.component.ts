import { Component } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AssignRoleGroup } from '../../../models/assign-rolegroup.model';
import { RoleGroup } from '../../../models/rolegroup.model';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'assign-rolegroup',
  templateUrl: './assign-rolegroup.component.html',
  styleUrls: ['./assign-rolegroup.component.css'],
})
export class AssignRoleGroupComponent extends CreateEditComponent<AssignRoleGroup> {
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  roleGroups: RoleGroup[] = [];

  constructor(
    private loaderService: LoaderService,
    private adminService: AdminService
  ) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
    this.roleGroups = this.adminService.getUser().allRoleGroups!;
  }

  initForm() {
    return new FormGroup({
      userId: new FormControl(this.formData.userId, [Validators.required]),
      roleGroupId: new FormControl(this.formData.roleGroupId, [
        Validators.required,
      ]),
      roleGroup: new FormControl(this.formData.roleGroup, [
        Validators.required,
      ]),
    });
  }

  roleGroupChange(value: RoleGroup) {
    if (value) {
      this.form.patchValue({ roleGroupId: value.id });
      this.form.patchValue({ userId: this.adminService.getUser().userId });
    }
  }
}

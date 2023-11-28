import { Component, Input } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { RoleGroup } from '../../../models/rolegroup.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AssignRoute } from '../../../models/assign-route.model';
import { Route } from '../../../models/route.model';

@Component({
  selector: 'assign-to-route',
  templateUrl: './assign-to-route.component.html',
  styleUrls: ['./assign-to-route.component.css'],
})
export class AssignToRouteComponent extends CreateEditComponent<AssignRoute> {
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  @Input() routes: Route[] = [];
  @Input() roleGroups: RoleGroup[] = [];

  constructor(private loaderService: LoaderService) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  initForm() {
    return new FormGroup({
      routeId: new FormControl(this.formData.routeId, [Validators.required]),
      roleGroupId: new FormControl(this.formData.roleGroupId, [
        Validators.required,
      ]),
      route: new FormControl(this.formData.route, [Validators.required]),
      roleGroup: new FormControl(this.formData.roleGroup, [
        Validators.required,
      ]),
    });
  }

  routeChange(value: Route) {
    if (value) this.form.patchValue({ routeId: value.id });
  }

  roleGroupChange(value: RoleGroup) {
    if (value) this.form.patchValue({ roleGroupId: value.id });
  }
}

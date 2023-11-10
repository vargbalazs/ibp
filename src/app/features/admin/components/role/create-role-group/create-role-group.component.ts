import { Component } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { RoleGroup } from '../../../models/rolegroup.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'create-rolegroup',
  templateUrl: './create-role-group.component.html',
  styleUrls: ['./create-role-group.component.css'],
})
export class CreateRoleGroupComponent extends CreateEditComponent<RoleGroup> {
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  constructor(private loaderService: LoaderService) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  initForm() {
    return new FormGroup({
      id: new FormControl(this.formData.id),
      name: new FormControl(this.formData.name, [Validators.required]),
    });
  }
}

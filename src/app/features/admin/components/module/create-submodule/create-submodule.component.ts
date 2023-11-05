import { Component, Input } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { SubModule } from '../../../models/submodule.model';
import { Module } from '../../../models/module.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'create-submodule',
  templateUrl: './create-submodule.component.html',
  styleUrls: ['./create-submodule.component.css'],
})
export class CreateSubmoduleComponent extends CreateEditComponent<SubModule> {
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  @Input() modules!: Module[];

  constructor(private loaderService: LoaderService) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  initForm() {
    return new FormGroup({
      id: new FormControl(this.formData.id),
      name: new FormControl(this.formData.name, [Validators.required]),
      module: new FormControl(this.formData.module, [Validators.required]),
    });
  }
}

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { Operation } from '../../../models/operation.model';
import { Module } from '../../../models/module.model';
import { SubModule } from '../../../models/submodule.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'create-operation',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateOperationComponent
  extends CreateEditComponent<Operation>
  implements OnInit, OnChanges
{
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  @Input() modules!: Module[];
  subModules!: SubModule[];

  constructor(
    private utilityService: UtilityService,
    private loaderService: LoaderService
  ) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.utilityService.changeControlState(this.form, ['subModule'], false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editMode) {
      this.form.controls.module.setValue(
        this.form.controls.subModule.value!.module
      );
      this.comboBoxValueChange = true;
      this.moduleChange(this.form.controls.subModule.value!.module);
      this.comboBoxValueChange = false;
    }
  }

  initForm() {
    return new FormGroup({
      id: new FormControl(this.formData.id, { nonNullable: true }),
      name: new FormControl(this.formData.name, {
        validators: Validators.required,
        nonNullable: true,
      }),
      module: new FormControl(this.formData.subModule?.module, {
        validators: Validators.required,
        nonNullable: true,
      }),
      subModule: new FormControl(this.formData.subModule, {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
  }

  moduleChange(value: Module) {
    if (value) {
      this.subModules = this.modules.filter(
        (module) => module.id === value.id
      )[0].subModules!;
      setTimeout(() => {
        this.utilityService.changeControlState(this.form, ['subModule'], true);
      });
    } else {
      this.resetState();
    }
    if (!this.comboBoxValueChange)
      this.form.patchValue({ subModule: undefined });
  }

  override resetState() {
    this.utilityService.changeControlState(this.form, ['subModule'], false);
    this.subModules = [];
  }

  override onSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formValue: Operation = {};
      Object.assign(formValue, this.form.value);

      const module = formValue.module!;
      const subModules = module!.subModules;

      delete module!.subModules;

      formValue.module = module;

      this.save.emit(formValue);
      this.resetState();

      this.modules.find(
        (module) => module.id === this.form.value.module!.id
      )!.subModules = subModules;
    }
  }
}

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { Permission } from '../../../models/permission.model';
import { Module } from '../../../models/module.model';
import { SubModule } from '../../../models/submodule.model';
import { Operation } from '../../../models/operation.model';
import { Action } from '../../../models/action.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'create-permission',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent
  extends CreateEditComponent<Permission>
  implements OnInit, OnChanges
{
  isBusy: BehaviorSubject<boolean>;

  override form: ReturnType<typeof this.initForm>;

  @Input() modules!: Module[];
  subModules!: SubModule[];
  @Input() operations!: Operation[];
  @Input() _operations!: Operation[];
  @Input() actions!: Action[];

  constructor(
    private utilityService: UtilityService,
    private loaderService: LoaderService
  ) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editMode) {
      this.form.patchValue({
        module: this.form.controls.operation.value!.subModule!.module,
      });
      this.form.patchValue({
        subModule: this.form.controls.operation.value!.subModule,
      });
      this.comboBoxValueChange = true;
      this.moduleChange(this.form.controls.module.value!);
      this.subModuleChange(this.form.controls.subModule.value!);
      this.operationChange(this.form.controls.operation.value!);
      this.actionChange(this.form.controls.action.value!);
      this.comboBoxValueChange = false;
    }
  }

  ngOnInit(): void {
    this.utilityService.changeControlState(
      this.form,
      ['subModule', 'operation', 'action'],
      false
    );
  }

  initForm() {
    return new FormGroup({
      id: new FormControl(this.formData.id),
      name: new FormControl(this.formData.name, [Validators.required]),
      module: new FormControl(new Module(), [Validators.required]),
      subModule: new FormControl(new SubModule(), [Validators.required]),
      operation: new FormControl(this.formData.operation, [
        Validators.required,
      ]),
      action: new FormControl(new Action(), [Validators.required]),
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
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ subModule: undefined });
      this.form.patchValue({ operation: undefined });
      this.form.patchValue({ action: undefined });
      this.form.patchValue({ name: '' });
    }
  }

  subModuleChange(value: SubModule) {
    if (value) {
      this.operations = this._operations.filter(
        (op) => op.subModule!.id === value.id
      );
      setTimeout(() => {
        this.utilityService.changeControlState(this.form, ['operation'], true);
      });
    } else {
      this.utilityService.changeControlState(
        this.form,
        ['operation', 'action'],
        false
      );
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ operation: undefined });
      this.form.patchValue({ action: undefined });
      this.form.patchValue({ name: '' });
    }
  }

  operationChange(value: Operation) {
    if (value) {
      setTimeout(() => {
        this.utilityService.changeControlState(this.form, ['action'], true);
      });
    } else {
      this.utilityService.changeControlState(this.form, ['action'], false);
    }
    if (!this.comboBoxValueChange) {
      this.form.patchValue({ action: undefined });
      this.form.patchValue({ name: '' });
    }
  }

  actionChange(value: Action) {
    if (value) {
      this.form.patchValue({
        name: `${value.name}_${this.form.controls.operation.value?.name}`,
      });
    } else {
      this.form.patchValue({ name: '' });
    }
  }

  override resetState() {
    this.utilityService.changeControlState(
      this.form,
      ['subModule', 'operation', 'action'],
      false
    );
    this.subModules = [];
  }
}

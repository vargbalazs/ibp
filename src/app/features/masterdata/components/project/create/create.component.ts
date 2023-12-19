import { Component, Input } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { Project } from '../../../models/project.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'create-project',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent extends CreateEditComponent<Project> {
  isBusy: BehaviorSubject<boolean>;

  override form!: ReturnType<typeof this.initForm>;

  @Input() customers!: Customer[];

  constructor(private loaderService: LoaderService) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  initForm() {
    return new FormGroup({
      id: new FormControl(this.formData.id),
      name: new FormControl(this.formData.name, [Validators.required]),
      customer: new FormControl(this.formData.customer, [Validators.required]),
    });
  }
}

import { Component, Input } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { Customer } from '../../../models/customer.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Bu } from '../../../models/bu.model';

@Component({
  selector: 'create-customer',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent extends CreateEditComponent<Customer> {
  isBusy: BehaviorSubject<boolean>;

  override form!: ReturnType<typeof this.initForm>;

  @Input() bus!: Bu[];

  constructor(private loaderService: LoaderService) {
    super();
    this.form = this.initForm();
    this.isBusy = this.loaderService.isLoading;
  }

  initForm() {
    return new FormGroup({
      id: new FormControl(this.formData.id),
      name: new FormControl(this.formData.name, [Validators.required]),
      code: new FormControl(this.formData.code, [Validators.required]),
      bu: new FormControl(this.formData.bu, [Validators.required]),
    });
  }
}

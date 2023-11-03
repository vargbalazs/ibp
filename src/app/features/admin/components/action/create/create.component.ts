import { Component } from '@angular/core';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';
import { Action } from '../../../models/action.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-action',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent extends CreateEditComponent<Action> {
  override form!: ReturnType<typeof this.initForm>;

  constructor() {
    super();
    this.form = this.initForm();
  }

  initForm() {
    return new FormGroup({
      id: new FormControl(this.formData.id),
      name: new FormControl(this.formData.name, [Validators.required]),
    });
  }
}

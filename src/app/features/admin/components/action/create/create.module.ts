import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { DialogModule } from '@progress/kendo-angular-dialog';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    InputsModule,
    ButtonModule,
    ReactiveFormsModule,
    LabelModule,
    DialogModule,
  ],
  exports: [CreateComponent],
})
export class CreateModule {}

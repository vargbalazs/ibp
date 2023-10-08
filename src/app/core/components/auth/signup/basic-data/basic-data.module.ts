import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataComponent } from './basic-data.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [BasicDataComponent],
  imports: [
    CommonModule,
    InputsModule,
    LabelModule,
    ReactiveFormsModule,
    ButtonsModule,
  ],
  exports: [BasicDataComponent],
})
export class BasicDataModule {}

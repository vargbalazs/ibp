import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDataComponent } from './login-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

@NgModule({
  declarations: [LoginDataComponent],
  imports: [
    CommonModule,
    InputsModule,
    LabelModule,
    ReactiveFormsModule,
    ButtonsModule,
    IndicatorsModule,
  ],
  exports: [LoginDataComponent],
})
export class LoginDataModule {}

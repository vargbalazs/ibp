import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { ReactiveFormsModule } from '@angular/forms';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    InputsModule,
    ButtonsModule,
    LabelModule,
    ReactiveFormsModule,
    IndicatorsModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}

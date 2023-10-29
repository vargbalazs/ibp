import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpwdComponent } from './forgotpwd.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

@NgModule({
  declarations: [ForgotpwdComponent],
  imports: [
    CommonModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    ReactiveFormsModule,
    IndicatorsModule,
  ],
  exports: [ForgotpwdComponent],
})
export class ForgotpwdModule {}

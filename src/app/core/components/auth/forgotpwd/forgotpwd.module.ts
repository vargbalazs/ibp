import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpwdComponent } from './forgotpwd.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingButtonModule } from 'src/app/shared/components/loading-button/loading-button.module';

@NgModule({
  declarations: [ForgotpwdComponent],
  imports: [
    CommonModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    ReactiveFormsModule,
    LoadingButtonModule,
  ],
  exports: [ForgotpwdComponent],
})
export class ForgotpwdModule {}

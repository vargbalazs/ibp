import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BasicDataModule } from './basic-data/basic-data.module';
import { LoginDataModule } from './login-data/login-data.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputsModule,
    LabelModule,
    ReactiveFormsModule,
    ButtonsModule,
    BasicDataModule,
    LoginDataModule,
  ],
  exports: [],
})
export class SignupModule {}

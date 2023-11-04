import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingButtonModule } from 'src/app/shared/components/loading-button/loading-button.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    InputsModule,
    ButtonsModule,
    LabelModule,
    ReactiveFormsModule,
    LoadingButtonModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}

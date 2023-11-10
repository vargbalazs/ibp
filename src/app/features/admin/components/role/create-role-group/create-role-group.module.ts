import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoleGroupComponent } from './create-role-group.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingButtonModule } from 'src/app/shared/components/loading-button/loading-button.module';

@NgModule({
  declarations: [CreateRoleGroupComponent],
  imports: [
    CommonModule,
    InputsModule,
    ButtonsModule,
    ReactiveFormsModule,
    LabelModule,
    DialogModule,
    LoadingButtonModule,
  ],
  exports: [CreateRoleGroupComponent],
})
export class CreateRoleGroupModule {}

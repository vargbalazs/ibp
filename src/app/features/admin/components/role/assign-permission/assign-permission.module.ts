import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignPermissionComponent } from './assign-permission.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LoadingButtonModule } from 'src/app/shared/components/loading-button/loading-button.module';
import { DraggableModule } from 'src/app/shared/directives/draggable/draggable.module';

@NgModule({
  declarations: [AssignPermissionComponent],
  imports: [
    CommonModule,
    InputsModule,
    ButtonsModule,
    ReactiveFormsModule,
    LabelModule,
    DialogModule,
    DropDownsModule,
    LoadingButtonModule,
    DraggableModule,
  ],
  exports: [AssignPermissionComponent],
})
export class AssignPermissionModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSubmoduleComponent } from './create-submodule.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LoadingButtonModule } from 'src/app/shared/components/loading-button/loading-button.module';
import { DraggableModule } from 'src/app/shared/directives/draggable/draggable.module';

@NgModule({
  declarations: [CreateSubmoduleComponent],
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
  exports: [CreateSubmoduleComponent],
})
export class CreateSubmoduleModule {}

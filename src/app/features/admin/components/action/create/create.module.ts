import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingButtonModule } from '../../../../../shared/components/loading-button/loading-button.module';
import { DraggableModule } from 'src/app/shared/directives/draggable/draggable.module';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    InputsModule,
    ButtonModule,
    ReactiveFormsModule,
    LabelModule,
    DialogModule,
    LoadingButtonModule,
    DraggableModule,
  ],
  exports: [CreateComponent],
})
export class CreateModule {}

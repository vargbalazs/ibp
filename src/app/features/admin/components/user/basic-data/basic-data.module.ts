import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataComponent } from './basic-data.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { AuthService } from 'src/app/core/services/auth.service';
import { LabelModule } from '@progress/kendo-angular-label';

@NgModule({
  declarations: [BasicDataComponent],
  imports: [
    CommonModule,
    InputsModule,
    ButtonsModule,
    ReactiveFormsModule,
    IndicatorsModule,
    LabelModule,
  ],
  providers: [AuthService],
  exports: [BasicDataComponent],
})
export class BasicDataModule {}

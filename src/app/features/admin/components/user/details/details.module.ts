import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BasicDataModule } from '../basic-data/basic-data.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonsModule,
    LayoutModule,
    BasicDataModule,
  ],
  exports: [DetailsComponent],
})
export class DetailsModule {}

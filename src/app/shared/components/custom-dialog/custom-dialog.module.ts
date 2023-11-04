import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CustomDialogComponent } from './custom-dialog.component';
import { LoadingButtonModule } from '../loading-button/loading-button.module';

@NgModule({
  declarations: [CustomDialogComponent],
  imports: [CommonModule, DialogsModule, ButtonsModule, LoadingButtonModule],
  exports: [CustomDialogComponent],
})
export class CustomDialogModule {}

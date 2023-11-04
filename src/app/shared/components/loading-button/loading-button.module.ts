import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { LoadingButtonComponent } from './loading-button.component';

@NgModule({
  declarations: [LoadingButtonComponent],
  imports: [CommonModule, IndicatorsModule],
  exports: [LoadingButtonComponent],
})
export class LoadingButtonModule {}

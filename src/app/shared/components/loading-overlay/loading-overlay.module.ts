import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

@NgModule({
  declarations: [LoadingOverlayComponent],
  imports: [CommonModule, IndicatorsModule],
  exports: [LoadingOverlayComponent],
})
export class LoadingOverlayModule {}

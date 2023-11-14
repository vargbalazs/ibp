import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, GridModule, DialogModule, LoadingOverlayModule],
})
export class RolesModule {}

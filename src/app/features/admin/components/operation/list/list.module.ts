import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { OperationService } from '../../../services/operation.service';
import { CreateOperationModule } from '../create/create.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    CreateOperationModule,
  ],
  providers: [OperationService],
  exports: [ListComponent],
})
export class OperationListModule {}

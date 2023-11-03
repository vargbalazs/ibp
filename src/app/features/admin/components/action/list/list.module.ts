import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionListComponent } from './list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
//import { CreateModule } from '../create/create.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ActionService } from '../../../services/action.service';

@NgModule({
  declarations: [ActionListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    // CreateModule,
    LoadingOverlayModule,
  ],
  exports: [ActionListComponent],
  providers: [ActionService],
})
export class ListModule {}

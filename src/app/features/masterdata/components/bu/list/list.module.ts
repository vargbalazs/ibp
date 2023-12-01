import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuListComponent } from './list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { CreateModule } from '../create/create.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { BuService } from '../../../services/bu.service';

@NgModule({
  declarations: [BuListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    CreateModule,
    LoadingOverlayModule,
  ],
  exports: [BuListComponent],
  providers: [BuService],
})
export class ListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ProjectService } from '../../../services/project.service';
import { CreateModule } from '../create/create.module';

@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    CreateModule,
  ],
  providers: [ProjectService],
  exports: [ProjectListComponent],
})
export class ListModule {}

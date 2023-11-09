import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionListComponent } from './list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { PermissionService } from '../../../services/permission.service';
import { CreatePermissionModule } from '../create/create.module';

@NgModule({
  declarations: [PermissionListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    CreatePermissionModule,
  ],
  providers: [PermissionService],
  exports: [PermissionListComponent],
})
export class PermissionListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { UserRolesComponent } from './roles.component';
import { AssignRoleGroupModule } from '../assign-rolegroup/assign-rolegroup.module';

@NgModule({
  declarations: [UserRolesComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    AssignRoleGroupModule,
  ],
  exports: [UserRolesComponent],
})
export class RolesModule {}

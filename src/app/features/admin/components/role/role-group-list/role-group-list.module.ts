import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleGroupListComponent } from './role-group-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { RoleGroupService } from '../../../services/rolegroup.service';
import { CreateRoleGroupModule } from '../create-role-group/create-role-group.module';

@NgModule({
  declarations: [RoleGroupListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    CreateRoleGroupModule,
  ],
  exports: [RoleGroupListComponent],
  providers: [RoleGroupService],
})
export class RoleGroupListModule {}

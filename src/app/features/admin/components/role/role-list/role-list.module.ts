import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { RoleService } from '../../../services/role.service';
import { CreateRoleModule } from '../create-role/create-role.module';

@NgModule({
  declarations: [RoleListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    CreateRoleModule,
  ],
  exports: [RoleListComponent],
  providers: [RoleService],
})
export class RoleListModule {}

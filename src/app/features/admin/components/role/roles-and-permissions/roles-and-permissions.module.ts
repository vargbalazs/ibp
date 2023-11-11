import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesAndPermissionsComponent } from './roles-and-permissions.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { InfobarModule } from 'src/app/shared/components/infobar/infobar.module';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AssignPermissionModule } from '../assign-permission/assign-permission.module';

@NgModule({
  declarations: [RolesAndPermissionsComponent],
  imports: [
    CommonModule,
    InputsModule,
    TreeViewModule,
    ButtonsModule,
    LoadingOverlayModule,
    InfobarModule,
    ContextMenuModule,
    AssignPermissionModule,
  ],
  exports: [RolesAndPermissionsComponent],
})
export class RolesAndPermissionsModule {}

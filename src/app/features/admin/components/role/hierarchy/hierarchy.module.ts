import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignToGroupComponent } from './hierarchy.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { InfobarModule } from 'src/app/shared/components/infobar/infobar.module';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AssignToRoleGroupModule } from '../assign-to-rolegroup/assign-to-rolegroup.module';

@NgModule({
  declarations: [AssignToGroupComponent],
  imports: [
    CommonModule,
    InputsModule,
    TreeViewModule,
    ButtonsModule,
    LoadingOverlayModule,
    InfobarModule,
    ContextMenuModule,
    AssignToRoleGroupModule,
  ],
  exports: [AssignToGroupComponent],
})
export class HierarchyModule {}

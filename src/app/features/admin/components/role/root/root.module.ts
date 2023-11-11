import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRootComponent } from './root.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { RoleListModule } from '../role-list/role-list.module';
import { RoleGroupListModule } from '../role-group-list/role-group-list.module';
import { AssignToGroupModule } from '../assign-to-group/assign-to-group.module';

@NgModule({
  declarations: [RoleRootComponent],
  imports: [
    CommonModule,
    LayoutModule,
    LoadingOverlayModule,
    RoleListModule,
    RoleGroupListModule,
    AssignToGroupModule,
  ],
  exports: [RoleRootComponent],
})
export class RoleRootModule {}

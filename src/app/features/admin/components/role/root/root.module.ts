import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRootComponent } from './root.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { RoleListModule } from '../role-list/role-list.module';
import { RoleGroupListModule } from '../role-group-list/role-group-list.module';
import { HierarchyModule } from '../hierarchy/hierarchy.module';
import { RolesAndPermissionsModule } from '../roles-and-permissions/roles-and-permissions.module';

@NgModule({
  declarations: [RoleRootComponent],
  imports: [
    CommonModule,
    LayoutModule,
    LoadingOverlayModule,
    RoleListModule,
    RoleGroupListModule,
    HierarchyModule,
    RolesAndPermissionsModule,
  ],
  exports: [RoleRootComponent],
})
export class RoleRootModule {}

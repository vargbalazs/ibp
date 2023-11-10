import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootModule } from './components/root/root.module';
import { ActionModule } from './components/action/action.module';
import { ModuleModule } from './components/module/module.module';
import { OperationModule } from './components/operation/operation.module';
import { PermissionsModule } from './components/permission/permission.module';
import { RoleModule } from './components/role/role.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RootModule,
    ActionModule,
    ModuleModule,
    OperationModule,
    PermissionsModule,
    RoleModule,
  ],
  providers: [],
  exports: [],
})
export class AdminModule {}

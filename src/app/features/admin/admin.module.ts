import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootModule } from './components/root/root.module';
import { ActionModule } from './components/action/action.module';
import { ModuleModule } from './components/module/module.module';
import { OperationModule } from './components/operation/operation.module';
import { PermissionsModule } from './components/permission/permission.module';
import { RoleModule } from './components/role/role.module';
import { UserModule } from './components/user/user.module';
import { AdminService } from './services/admin.service';

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
    UserModule,
  ],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}

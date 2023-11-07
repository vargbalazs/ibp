import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootModule } from './components/root/root.module';
import { ActionModule } from './components/action/action.module';
import { ModuleModule } from './components/module/module.module';
import { OperationModule } from './components/operation/operation.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RootModule,
    ActionModule,
    ModuleModule,
    OperationModule,
  ],
  providers: [],
  exports: [],
})
export class AdminModule {}

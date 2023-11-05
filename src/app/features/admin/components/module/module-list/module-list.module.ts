import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleListComponent } from './module-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ModuleService } from '../../../services/module.service';
//import { CreateModuleModule } from '../create-module/create-module.module';

@NgModule({
  declarations: [ModuleListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    //CreateModuleModule,
  ],
  exports: [ModuleListComponent],
  providers: [ModuleService],
})
export class ModuleListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRootComponent } from './root.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ModuleListModule } from '../module-list/module-list.module';
// import { SubmoduleListModule } from '../submodule-list/submodule-list.module';
// import { HierarchyModule } from '../hierarchy/hierarchy.module';

@NgModule({
  declarations: [ModuleRootComponent],
  imports: [
    CommonModule,
    LayoutModule,
    LoadingOverlayModule,
    ModuleListModule,
    // SubmoduleListModule,
    // HierarchyModule,
  ],
  exports: [ModuleRootComponent],
})
export class ModuleRootModule {}

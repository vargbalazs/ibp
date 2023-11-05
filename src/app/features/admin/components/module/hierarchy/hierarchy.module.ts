import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchyComponent } from './hierarchy.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { InputsModule } from '@progress/kendo-angular-inputs';
//import { InfobarModule } from 'src/app/shared/components/infobar/infobar.module';

@NgModule({
  declarations: [HierarchyComponent],
  imports: [
    CommonModule,
    TreeViewModule,
    ButtonModule,
    LoadingOverlayModule,
    ContextMenuModule,
    InputsModule,
    //InfobarModule,
  ],
  exports: [HierarchyComponent],
})
export class HierarchyModule {}

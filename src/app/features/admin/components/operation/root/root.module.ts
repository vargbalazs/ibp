import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationRootComponent } from './root.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { OperationListModule } from '../list/list.module';
//import { HierarchyModule } from '../hierarchy/hierarchy.module';

@NgModule({
  declarations: [OperationRootComponent],
  imports: [
    CommonModule,
    LayoutModule,
    LoadingOverlayModule,
    OperationListModule,
    //HierarchyModule,
  ],
  exports: [OperationRootComponent],
})
export class OperationRootModule {}

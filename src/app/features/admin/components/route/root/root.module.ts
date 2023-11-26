import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteRootComponent } from './root.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { ListModule } from '../list/list.module';

@NgModule({
  declarations: [RouteRootComponent],
  imports: [CommonModule, LayoutModule, LoadingOverlayModule, ListModule],
  exports: [RouteRootComponent],
})
export class RouteRootModule {}

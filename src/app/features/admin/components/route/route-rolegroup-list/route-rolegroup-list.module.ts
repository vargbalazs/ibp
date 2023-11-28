import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteRoleGroupListComponent } from './route-rolegroup-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { RouteService } from '../../../services/route.service';
import { AssignToRouteModule } from '../assign-to-route/assign-to-route.module';

@NgModule({
  declarations: [RouteRoleGroupListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    AssignToRouteModule,
  ],
  exports: [RouteRoleGroupListComponent],
  providers: [RouteService],
})
export class RouteRoleGroupListModule {}

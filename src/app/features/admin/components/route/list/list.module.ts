import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteListComponent } from './list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
//import { CreateModule } from '../create/create.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { RouteService } from '../../../services/route.service';

@NgModule({
  declarations: [RouteListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    //CreateModule,
    LoadingOverlayModule,
  ],
  exports: [RouteListComponent],
  providers: [RouteService],
})
export class ListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { CustomerService } from '../../../services/customer.service';
import { CreateModule } from '../create/create.module';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    CreateModule,
  ],
  providers: [CustomerService],
  exports: [CustomerListComponent],
})
export class ListModule {}

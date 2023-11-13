import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { UserService } from '../../../services/user.service';
import { DialogModule } from '@progress/kendo-angular-dialog';
//import { CreateModule } from '../create/create.module';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
//import { DetailsModule } from '../details/details.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    // CreateModule,
    LoadingOverlayModule,
    // DetailsModule,
  ],
  exports: [UserListComponent],
  providers: [UserService],
})
export class ListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmoduleListComponent } from './submodule-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { SubModuleService } from '../../../services/submodule.service';
import { CreateSubmoduleModule } from '../create-submodule/create-submodule.module';

@NgModule({
  declarations: [SubmoduleListComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule,
    LoadingOverlayModule,
    CreateSubmoduleModule,
  ],
  providers: [SubModuleService],
  exports: [SubmoduleListComponent],
})
export class SubmoduleListModule {}

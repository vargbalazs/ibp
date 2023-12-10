import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { LoadingOverlayModule } from 'src/app/shared/components/loading-overlay/loading-overlay.module';
import { UserConstraintsComponent } from './constraints.component';
import { ConstraintService } from '../../../services/constraint.service';
import { AssignConstraintModule } from '../assign-constraint/assign-constraint.module';

@NgModule({
  declarations: [UserConstraintsComponent],
  imports: [
    CommonModule,
    GridModule,
    LoadingOverlayModule,
    AssignConstraintModule,
  ],
  exports: [UserConstraintsComponent],
  providers: [ConstraintService],
})
export class ConstraintsModule {}

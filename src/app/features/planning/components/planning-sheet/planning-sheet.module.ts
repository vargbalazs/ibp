import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningSheetComponent } from './planning-sheet.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { EnhancedGridDirectiveModule } from 'src/app/shared/directives/enhanced-grid/enhanced-grid-directive.module';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlanningSheetComponent],
  imports: [
    CommonModule,
    GridModule,
    EnhancedGridDirectiveModule,
    ComboBoxModule,
    ReactiveFormsModule,
  ],
  exports: [PlanningSheetComponent],
})
export class PlanningSheetModule {}

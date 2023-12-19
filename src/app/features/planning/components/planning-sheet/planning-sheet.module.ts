import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningSheetComponent } from './planning-sheet.component';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@NgModule({
  declarations: [PlanningSheetComponent],
  imports: [CommonModule, SpreadsheetAllModule],
  exports: [PlanningSheetComponent],
})
export class PlanningSheetModule {}

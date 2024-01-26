import { FormGroup } from '@angular/forms';
import {
  CellCloseEvent,
  CreateFormGroupArgs,
  GridComponent,
  GridDataResult,
} from '@progress/kendo-angular-grid';
import { EnhancedGridConfig } from '../classes/enhanced-grid-config.class';

// custom function for the cell close logic
export function cellClose(
  args: CellCloseEvent,
  config: EnhancedGridConfig,
  grid: GridComponent,
  cellEditingFormGroupFn: (args: CreateFormGroupArgs) => FormGroup,
  resetFn: () => void
) {
  // if some filters or sorting are active, we have to override the edited row index
  if (grid.filter?.filters || grid.sort!.length > 0) {
    const gridData = (<GridDataResult>grid.data).data;
    config.editedRowIndex = gridData.findIndex(
      (item) => item.dataRowIndex === grid.activeCell.dataItem.dataRowIndex
    );
  }
  // if cell data is invalid, then put the cell back in edit mode
  // with this, we are preventing to focus out (except if we entered in edit mode with Enter)
  // in case of Enter, the old value gets written back
  if (!(<FormGroup>args.formGroup).valid) {
    // if some filters or sorting are active, we use the 'editedRowIndexFilterOrSort' for putting the cell in edit mode
    if (grid.filter?.filters || grid.sort!.length > 0) {
      args.formGroup = config.originalDataItem;
      grid.editCell(
        config.editedRowIndexFilterOrSort,
        config.editedColIndex,
        cellEditingFormGroupFn(args)
      );
    } else {
      args.formGroup = config.originalDataItem;
      grid.editCell(
        config.editedRowIndex,
        config.editedColIndex,
        cellEditingFormGroupFn(args)
      );
    }
  }
  // if we hit escape, then restore the original value
  if ((<KeyboardEvent>args.originalEvent)?.key === 'Escape') {
    // if some filters or sorting are active
    if (grid.filter?.filters || grid.sort!.length > 0) {
      // gridData will have only the filtered rows, so we have to determine the right edited row index
      const gridData = (<GridDataResult>grid.data).data;
      config.editedRowIndex = gridData.findIndex(
        (item) => item.dataRowIndex === grid.activeCell.dataItem.dataRowIndex
      );
      gridData[config.editedRowIndex] = config.originalDataItem;
    } else {
      config.gridData[config.editedRowIndex] = config.originalDataItem;
    }
    // we have to restore the original values also in the full grid data
    const index = config.fullGridData.findIndex(
      (item) => item.dataRowIndex === grid.activeCell.dataItem.dataRowIndex
    );
    config.fullGridData[index] = config.originalDataItem;
    config.noFocusingWithArrowKeys = false;
    resetFn();
  }
}

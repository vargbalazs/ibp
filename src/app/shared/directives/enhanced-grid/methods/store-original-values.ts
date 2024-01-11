import { GridComponent } from '@progress/kendo-angular-grid';
import { EnhancedGridConfig } from '../classes/enhanced-grid-config.class';

// before editing, we store all the relevant original values
export function storeOriginalValues(
  grid: GridComponent,
  config: EnhancedGridConfig
) {
  config.editedRowIndex = grid.activeCell.dataRowIndex;
  config.editedColIndex = grid.activeCell.colIndex;
  config.originalDataItem = {};
  Object.assign(config.originalDataItem, grid.activeCell.dataItem);
}

import { GridComponent } from '@progress/kendo-angular-grid';
import { EnhancedGridConfig } from '../classes/enhanced-grid-config.class';
import * as methods from './index';

// select cells with the mouse
export function selectWithMouse(
  config: EnhancedGridConfig,
  e: MouseEvent,
  grid: GridComponent,
  updateFn: () => void
) {
  e.preventDefault();
  // get the target
  const target = <HTMLElement>e.target;
  // if we move on a data cell
  if (
    target?.hasAttribute('ng-reflect-data-row-index') &&
    target?.hasAttribute('ng-reflect-col-index')
  ) {
    // get the indexes
    const dataRowIndex = +target.attributes.getNamedItem(
      'ng-reflect-data-row-index'
    )!.value;
    const columnIndex = +target.attributes.getNamedItem('ng-reflect-col-index')!
      .value;

    // store the first selected cell, it's position and it's value
    if (config.selectedCells.length === 0) {
      // store the html element of the first cell
      config.firstSelectedCellElement = target;
      // the cell itself
      config.selectedCells.push({
        itemKey: grid.activeCell.dataRowIndex,
        columnKey: grid.activeCell.colIndex,
      });
      Object.assign(config.firstSelectedCell, config.selectedCells[0]);

      // it's position
      methods.setRectValues(config.firstSelectedCellRect, target);

      // it's value
      // get the column field name
      config.fieldName = config.columns[grid.activeCell.colIndex].field;
      // if in the cell we have an object
      if (config.fieldName.includes('.')) {
        const objectKey = config.fieldName.substring(
          0,
          config.fieldName.indexOf('.')
        );
        const propertyKey = config.fieldName.substring(
          config.fieldName.indexOf('.') + 1
        );
        config.selectedCellDatas.push({
          value: grid.activeCell.dataItem[objectKey][propertyKey],
        });
      } else
        config.selectedCellDatas.push({
          value: grid.activeCell.dataItem[config.fieldName],
        });
    }

    // store the last selected cell and it's position
    config.lastSelectedCell = {
      itemKey: dataRowIndex,
      columnKey: columnIndex,
    };
    methods.setRectValues(config.lastSelectedCellRect, target);

    // mark the cells as selected and update the state only if we move to another cell
    if (
      config.rowIndex != config.lastSelectedCell.itemKey ||
      config.colIndex != config.lastSelectedCell.columnKey
    ) {
      methods.markCellsAsSelected(config);
      methods.calculateAggregates(config);

      // update only, if we are in another cell
      if (config.selectedCells.length >= 1) updateFn();

      // set the indexes to the indexes of the last selected cell
      config.rowIndex = config.lastSelectedCell.itemKey;
      config.colIndex = config.lastSelectedCell.columnKey;

      // update also the selected area
      methods.resizeSelectedArea(config);
    }
  }
}

import { GridDataResult } from '@progress/kendo-angular-grid';
import { Repository } from '../interfaces/repository.interface';
import { CustomNotificationService } from '../services/notification.service';

export abstract class Crud<T extends { id: number }> {
  gridData!: GridDataResult;
  isNew: boolean;
  editDataItem!: T;

  constructor(
    private repositoryService: Repository<T>,
    private notifyService: CustomNotificationService
  ) {
    this.isNew = false;
  }

  addHandler() {
    this.editDataItem = <T>{};
    this.isNew = true;
  }

  editHandler(dataItem: T) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }

  saveHandler(entity: T) {
    this.save(entity);
    this.resetDataItem();
  }

  cancelHandler() {
    this.resetDataItem();
  }

  removeHandler(dataItem: T) {}

  resetDataItem() {
    this.editDataItem = undefined!;
  }

  save(entity: T) {
    if (this.isNew) {
      this.repositoryService.add!(entity).subscribe((id) => {
        entity.id = id;
        this.gridData.data = [...this.gridData.data, entity];
        this.notifyService.showNotification(
          5000,
          'success',
          'Sikeres mentés!',
          'Az új elem megtalálható a listában.'
        );
      });
    } else {
      this.repositoryService.update!(entity).subscribe((id) => {
        this.gridData.data = this.gridData.data.map((item) =>
          item.id === entity.id ? entity : item
        );
        this.notifyService.showNotification(
          5000,
          'success',
          'Sikeres módosítás!',
          'A listában már a módosított adatok szerepelnek.'
        );
      });
    }
  }

  remove(entity: T) {
    this.repositoryService.delete!(entity.id).subscribe((id) => {
      this.gridData.data = this.gridData.data.filter(
        (item) => item.id !== entity.id
      );
      this.notifyService.showNotification(
        5000,
        'success',
        'Sikeres törlés!',
        'A kiválasztott elem eltávolításra került a listából.'
      );
    });
  }
}
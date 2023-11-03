import { GridDataResult } from '@progress/kendo-angular-grid';
import { Repository } from '../interfaces/repository.interface';
import { CustomNotificationService } from '../services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export abstract class Crud<T extends { id: number }> {
  gridData!: GridDataResult;
  isNew: boolean;
  editDataItem!: T;
  loadingOverlayVisible: BehaviorSubject<boolean>;

  constructor(
    private repositoryService: Repository<T>,
    private notifyService: CustomNotificationService,
    private loaderService: LoaderService
  ) {
    this.isNew = false;
    this.loadingOverlayVisible = this.loaderService.isLoading;
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
      this.repositoryService.add!(entity).subscribe((newEntity) => {
        this.gridData.data = [...this.gridData.data, newEntity];
        this.notifyService.showNotification(
          5000,
          'success',
          'Sikeres mentés!',
          'Az új elem megtalálható a listában.'
        );
      });
    } else {
      this.repositoryService.update!(entity).subscribe((updatedEntity) => {
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

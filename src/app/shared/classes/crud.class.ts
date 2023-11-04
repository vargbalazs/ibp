import { GridDataResult } from '@progress/kendo-angular-grid';
import { Repository } from '../interfaces/repository.interface';
import { CustomNotificationService } from '../services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { MsgDialogService } from '../services/dialog.service';
import { DialogActionsEnum } from '../components/custom-dialog/dialog-actions.enum';
import { DialogAction } from '../interfaces/dialog-action.interface';
import { DialogRef } from '@progress/kendo-angular-dialog';

export abstract class Crud<T extends { id: number }> {
  gridData!: GridDataResult;
  isNew: boolean;
  dialogOpened: boolean;
  editDataItem!: T;
  loadingOverlayVisible!: BehaviorSubject<boolean>;
  private dialogRef!: DialogRef;

  constructor(
    private repositoryService: Repository<T>,
    private notifyService: CustomNotificationService,
    private loaderService: LoaderService,
    private msgDialogService: MsgDialogService
  ) {
    this.isNew = false;
    this.dialogOpened = false;
    this.loadingOverlayVisible = this.loaderService.isLoading;
  }

  addHandler() {
    this.editDataItem = <T>{};
    this.isNew = true;
    this.dialogOpened = true;
  }

  editHandler(dataItem: T) {
    this.editDataItem = dataItem;
    this.dialogOpened = true;
    this.isNew = false;
  }

  saveHandler(entity: T) {
    this.save(entity);
    // reset here, if we want to use the loading overlay, as it hides the new/edit dialog immediatelly
    // otherwise reset in the 'save' method
    // this.resetDataItem();
  }

  cancelHandler() {
    this.resetDataItem();
  }

  removeHandler(dataItem: T) {
    this.dialogOpened = true;
    this.dialogRef = this.msgDialogService.showDialog(
      'Elem törlése',
      'Valóban törölni szeretnéd a kiválasztott elemet? Minden adat véglegesen törlődik. Ez a művelet nem visszavonható.',
      'error',
      'Igen',
      true
    );
    this.dialogRef.dialog.instance.close.subscribe((result) => {
      if ((result as DialogAction).action === DialogActionsEnum.Yes) {
        this.remove(dataItem);
      }
    });
  }

  resetDataItem() {
    this.editDataItem = undefined!;
  }

  save(entity: T) {
    if (this.isNew) {
      const { id, ...newEntity } = entity;
      this.repositoryService.add!(newEntity).subscribe((newEntity) => {
        this.resetDataItem();
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
        this.resetDataItem();
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
      this.dialogRef.close();
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

import { GridDataResult } from '@progress/kendo-angular-grid';
import { Repository } from '../interfaces/repository.interface';
import { CustomNotificationService } from '../services/notification.service';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { MsgDialogService } from '../services/dialog.service';
import { DialogActionsEnum } from '../components/custom-dialog/dialog-actions.enum';
import { DialogAction } from '../interfaces/dialog-action.interface';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { AlternativeId } from '../interfaces/alternative-id.interface';
import { ViewContainerRef, inject } from '@angular/core';
import { AdminService } from 'src/app/features/admin/services/admin.service';
import { CrudOptions } from '../interfaces/crud-options.interface';

export abstract class Crud<T extends { id?: number }> {
  gridData!: GridDataResult;
  isNew: boolean;
  dialogOpened: boolean;
  editDataItem!: T;
  loadingOverlayVisible!: BehaviorSubject<boolean>;
  protected dialogRef!: DialogRef;
  customRemoveFn!: (dataItem: T) => void;
  customSaveFn!: (dataItem: T) => void;
  dialogContainer!: ViewContainerRef;
  adminService: AdminService;
  permission!: string;

  constructor(
    private repositoryService: Repository<T>,
    protected notifyService: CustomNotificationService,
    private loaderService: LoaderService,
    private msgDialogService: MsgDialogService
  ) {
    this.isNew = false;
    this.dialogOpened = false;
    this.loadingOverlayVisible = this.loaderService.isLoading;
    this.adminService = inject(AdminService);
  }

  addHandler(options?: CrudOptions) {
    if (options && options.permission) {
      if (!this.adminService.hasPermission(options.permission)) return;
      this.permission = options.permission;
    }
    this.editDataItem = <T>{};
    this.isNew = true;
    this.dialogOpened = true;
  }

  editHandler(dataItem: T, options?: CrudOptions) {
    if (options && options.permission) {
      if (!this.adminService.hasPermission(options.permission)) return;
      this.permission = options.permission;
    }
    this.editDataItem = dataItem;
    this.dialogOpened = true;
    this.isNew = false;
  }

  saveHandler(entity: T, type: 'default' | 'custom') {
    if (type === 'default') {
      this.defaultSave(entity);
    } else {
      this.customSave(entity);
    }

    // reset here, if we want to use the loading overlay, as it hides the new/edit dialog immediatelly
    // otherwise reset in the 'save' method
    // this.resetDataItem();
  }

  cancelHandler() {
    this.dialogOpened = false;
    this.resetDataItem();
  }

  removeHandler(
    dataItem: T,
    type: 'default' | 'custom',
    options?: CrudOptions
  ) {
    if (options && options.permission) {
      if (!this.adminService.hasPermission(options.permission)) return;
      this.permission = options.permission;
    }
    this.dialogOpened = true;
    this.dialogRef = this.msgDialogService.showDialog(
      this.dialogContainer,
      'Elem törlése',
      'Valóban törölni szeretnéd a kiválasztott elemet? Minden adat véglegesen törlődik. Ez a művelet nem visszavonható.',
      'error',
      'Igen',
      true
    );
    this.dialogRef.dialog.instance.close.subscribe((result) => {
      if ((result as DialogAction).action === DialogActionsEnum.Cancel) {
        this.closeDialog();
      }
      if ((result as DialogAction).action === DialogActionsEnum.Yes) {
        if (type === 'default') {
          this.defaultRemove(dataItem, options?.alternativeId);
        } else this.customRemove(dataItem);
      }
    });
  }

  resetDataItem() {
    this.editDataItem = undefined!;
    this.dialogOpened = false;
  }

  defaultSave(entity: T) {
    if (this.isNew) {
      const { id, ...newEntity } = entity;
      this.repositoryService.add!(newEntity, this.permission)
        .pipe(
          catchError((err) => {
            this.closeDialog();
            return of();
          })
        )
        .subscribe((newEntity) => {
          this.resetDataItem();
          this.gridData.data = [...this.gridData.data, newEntity];
          this.notifyService.showNotification(
            'normal',
            5000,
            'success',
            'Sikeres mentés!',
            'Az új elem megtalálható a listában.'
          );
        });
    } else {
      this.repositoryService.update!(entity, this.permission)
        .pipe(
          catchError((err) => {
            this.closeDialog();
            return of();
          })
        )
        .subscribe((updatedEntity) => {
          this.resetDataItem();
          this.gridData.data = this.gridData.data.map((item) =>
            item.id === entity.id ? entity : item
          );
          this.notifyService.showNotification(
            'normal',
            5000,
            'success',
            'Sikeres módosítás!',
            'A listában már a módosított adatok szerepelnek.'
          );
        });
    }
  }

  defaultRemove(entity: T, alternativeId?: AlternativeId) {
    const id = alternativeId ? alternativeId.value : entity.id;
    this.repositoryService.delete!(id!, this.permission)
      .pipe(
        catchError((err) => {
          this.closeDialog();
          return of();
        })
      )
      .subscribe((id) => {
        this.closeDialog();
        this.gridData.data = this.gridData.data.filter((item) => {
          if (alternativeId) {
            return (
              item[alternativeId!.columnName as keyof typeof item] !==
              alternativeId!.value
            );
          } else {
            return item.id !== entity.id;
          }
        });
        this.notifyService.showNotification(
          'normal',
          5000,
          'success',
          'Sikeres törlés!',
          'A kiválasztott elem eltávolításra került a listából.'
        );
      });
  }

  private customRemove(dataItem: T) {
    this.customRemoveFn(dataItem);
  }

  private customSave(dataItem: T) {
    this.customSaveFn(dataItem);
  }

  public closeDialog() {
    if (this.dialogRef) this.dialogRef.close();
    this.dialogOpened = false;
  }
}

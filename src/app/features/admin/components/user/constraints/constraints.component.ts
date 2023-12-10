import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/features/admin/models/user.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { catchError, of } from 'rxjs';
import AdminPermissions from 'src/app/core/enums/permissions/admin-perm.enum';
import { Constraint } from '../../../models/constraint.model';
import { ConstraintService } from '../../../services/constraint.service';
import { ContainerService } from 'src/app/shared/services/container.service';

@Component({
  selector: 'user-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css'],
})
export class UserConstraintsComponent
  extends Crud<Constraint>
  implements OnInit
{
  user!: User;

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  @ViewChild('dialogContainer', { read: ViewContainerRef })
  override dialogContainer!: ViewContainerRef;

  constructor(
    private constraintService: ConstraintService,
    private containerService: ContainerService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(constraintService, notifyService, loaderService, msgDialogService);

    this.customSaveFn = function customSave(dataItem: Constraint) {
      this.containerService.setContainer(this.container);
      dataItem.userId = this.user.userId;
      const copiedDataItem: Constraint = {};
      Object.assign(copiedDataItem, dataItem);
      delete dataItem.id;
      delete dataItem.role?.permissions;
      delete dataItem.object;
      delete dataItem.field;
      if (this.isNew) {
        this.constraintService
          .add(dataItem, AdminPermissions.ADMIN)
          .pipe(
            catchError((err) => {
              this.cancelHandler();
              return of();
            })
          )
          .subscribe((resp) => {
            this.notifyService.showNotification(
              'compact',
              5000,
              'success',
              'Sikeres mentés!',
              'Az új elem megtalálható a listában.',
              this.container
            );
            this.user.constraints?.push(resp);
            this.resetDataItem();
          });
      } else {
        dataItem.id = copiedDataItem.id;
        this.constraintService
          .update(dataItem, AdminPermissions.ADMIN)
          .pipe(
            catchError((err) => {
              this.cancelHandler();
              return of();
            })
          )
          .subscribe((resp) => {
            this.notifyService.showNotification(
              'compact',
              5000,
              'success',
              'Sikeres módosítás!',
              'A listában már a módosított adatok szerepelnek.',
              this.container
            );
            this.user.constraints = this.user.constraints?.map((constraint) =>
              constraint.id === dataItem.id ? dataItem : constraint
            );
            this.gridData.data = this.user.constraints!;
            this.resetDataItem();
          });
      }
    };

    this.customRemoveFn = function customRemove(dataItem: Constraint) {
      this.constraintService
        .delete(dataItem.id!, AdminPermissions.ADMIN)
        .pipe(
          catchError((err) => {
            this.closeDialog();
            return of();
          })
        )
        .subscribe((resp) => {
          this.dialogRef.close();
          this.notifyService.showNotification(
            'compact',
            5000,
            'success',
            'Sikeres törlés!',
            'A kiválasztott elem eltávolításra került a listából.',
            this.container
          );
          this.user.constraints = this.user.constraints!.filter(
            (constraint) => constraint.id !== dataItem.id
          );
          this.gridData.data = this.user.constraints;
          this.resetDataItem();
        });
    };
  }

  ngOnInit(): void {
    this.permission = AdminPermissions.ADMIN;
    this.gridData = { data: [], total: 0 };
    this.user = this.adminService.getEditedUser();

    if (this.user.constraints) {
      this.gridData = {
        data: this.user.constraints!,
        total: this.user.constraints!.length,
      };
    }
  }
}

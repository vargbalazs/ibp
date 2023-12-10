import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/features/admin/models/user.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { AssignRoleGroup } from '../../../models/assign-rolegroup.model';
import { catchError, of } from 'rxjs';
import AdminPermissions from 'src/app/core/enums/permissions/admin-perm.enum';
import { Constraint } from '../../../models/constraint.model';
import { ConstraintService } from '../../../services/constraint.service';
import { Field } from 'src/app/core/interfaces/field.interface';
import { Table } from 'src/app/core/interfaces/table.interface';
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
      dataItem.objectField = (dataItem.objectField as unknown as Field).name;
      dataItem.objectName = (dataItem.objectName as unknown as Table).name;
      dataItem.userId = this.user.userId;
      delete dataItem.id;
      delete dataItem.role?.permissions;
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
            this.user.constraints?.push(dataItem);
            this.resetDataItem();
          });
      }
    };

    this.customRemoveFn = function customRemove(dataItem: Constraint) {};
  }

  ngOnInit(): void {
    this.permission = AdminPermissions.ADMIN;
    this.gridData = { data: [], total: 0 };
    this.user = this.adminService.getUser();

    if (this.user.constraints) {
      this.gridData = {
        data: this.user.constraints!,
        total: this.user.constraints!.length,
      };
    }
  }
}

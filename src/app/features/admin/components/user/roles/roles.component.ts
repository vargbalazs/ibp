import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/features/admin/models/user.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../../../services/user.service';
import { AssignRoleGroupToUser } from '../../../interfaces/assign-rolegroup-to-user.interface';
import { AssignRoleGroup } from '../../../models/assign-rolegroup.model';
import { RoleGroupService } from '../../../services/rolegroup.service';
import { RoleGroup } from '../../../models/rolegroup.model';
import { catchError, of } from 'rxjs';
import AdminPermissions from 'src/app/core/enums/permissions/admin-perm.enum';

@Component({
  selector: 'user-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class UserRolesComponent
  extends Crud<AssignRoleGroup>
  implements OnInit
{
  user!: User;
  roles: AssignRoleGroupToUser[] = [];

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  @ViewChild('dialogContainer', { read: ViewContainerRef })
  override dialogContainer!: ViewContainerRef;

  constructor(
    private userService: UserService,
    private roleGroupService: RoleGroupService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(userService, notifyService, loaderService, msgDialogService);

    this.customSaveFn = function customSave(dataItem: AssignRoleGroup) {
      this.roleGroupService
        .assignRoleGroupToUser(
          dataItem.roleGroupId!,
          this.user.userId!,
          this.container,
          AdminPermissions.ADMIN
        )
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
          this.addRoles(dataItem.roleGroup!);
          this.user.roleGroups?.push(dataItem.roleGroup!);
          this.resetDataItem();
        });
    };

    this.customRemoveFn = function customRemove(dataItem: AssignRoleGroup) {
      this.roleGroupService
        .removeRoleGroupFromUser(
          dataItem.roleGroupId!,
          this.user.userId!,
          this.container,
          AdminPermissions.ADMIN
        )
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
          this.roles = this.roles.filter(
            (role) => role.roleGroupId !== dataItem.roleGroupId
          );
          this.gridData.data = this.roles;
          this.user.roleGroups = this.user.roleGroups?.filter(
            (roleGroup) => roleGroup.id !== dataItem.roleGroupId
          );
          this.resetDataItem();
        });
    };
  }

  ngOnInit(): void {
    this.permission = AdminPermissions.ADMIN;
    this.gridData = { data: [], total: 0 };
    this.user = this.adminService.getEditedUser();

    this.user.roleGroups?.map((roleGroup) => {
      this.addRoles(roleGroup);
    });

    this.gridData = { data: this.roles, total: this.roles.length };
  }

  addRoles(roleGroup: RoleGroup) {
    roleGroup.roles?.forEach((role) => {
      this.roles.push({
        roleGroupId: roleGroup.id!,
        roleGroupName: roleGroup.name!,
        roleId: role.id!,
        roleName: role.name!,
      });
    });
  }
}

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/features/admin/models/user.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { AssignRoleGroupToUser } from '../../../interfaces/assign-rolegroup-to-user.interface';
import { AssignRoleGroup } from '../../../models/assign-rolegroup.model';
import { RoleGroupService } from '../../../services/rolegroup.service';
import { RoleGroup } from '../../../models/rolegroup.model';
import { DialogAction } from 'src/app/shared/interfaces/dialog-action.interface';
import { DialogActionsEnum } from 'src/app/shared/components/custom-dialog/dialog-actions.enum';

@Component({
  selector: 'user-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class UserRolesComponent extends Crud<User> implements OnInit {
  user!: User;
  roles: AssignRoleGroupToUser[] = [];

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private roleGroupService: RoleGroupService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(userService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    this.user = this.adminService.getUser();

    this.user.roleGroups?.map((roleGroup) => {
      this.addRoles(roleGroup);
    });

    this.gridData = { data: this.roles, total: this.roles.length };
  }

  override saveHandler(assignRoleGroup: AssignRoleGroup) {
    this.roleGroupService
      .assignRoleGroupToUser(assignRoleGroup.roleGroupId!, this.user.userId!)
      .subscribe((resp) => {
        this.notifyService.showNotification(
          'compact',
          5000,
          'success',
          'Sikeres mentés!',
          'Az új elem megtalálható a listában.',
          this.container
        );
        this.addRoles(assignRoleGroup.roleGroup!);
        this.user.roleGroups?.push(assignRoleGroup.roleGroup!);
        this.resetDataItem();
      });
  }

  override removeHandler(assignRoleGroup: AssignRoleGroup) {
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
        this.roleGroupService
          .removeRoleGroupFromUser(
            assignRoleGroup.roleGroupId!,
            this.user.userId!
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
            this.gridData.data = this.roles.filter(
              (role) => role.roleGroupId !== assignRoleGroup.roleGroupId
            );
            this.user.roleGroups = this.user.roleGroups?.filter(
              (roleGroup) => roleGroup.id !== assignRoleGroup.roleGroupId
            );
            this.resetDataItem();
          });
      }
    });
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

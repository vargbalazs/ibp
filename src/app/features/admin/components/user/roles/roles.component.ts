import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/admin/models/user.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { AssignRoleToUser } from '../../../interfaces/assign-role-to-user.interface';

@Component({
  selector: 'user-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class UserRolesComponent extends Crud<User> implements OnInit {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(userService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    const user = this.adminService.getUser();
    const roles: AssignRoleToUser[] = [];

    user.roleGroups?.map((roleGroup) => {
      roleGroup.roles?.forEach((role) => {
        roles.push({
          roleGroupId: roleGroup.id!,
          roleGroupName: roleGroup.name!,
          roleId: role.id!,
          roleName: role.name!,
        });
      });
    });

    this.gridData = { data: roles, total: roles.length };
  }
}

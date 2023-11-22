import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../models/user.model';
import { RoleGroup } from '../../../models/rolegroup.model';
import { AssignPermissionToUser } from '../../../interfaces/assign-permission-to-user.interface';

@Component({
  selector: 'user-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class UserPermissionsComponent implements OnInit {
  user!: User;
  gridData!: GridDataResult;
  permissions: AssignPermissionToUser[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    this.user = this.adminService.getUser();

    this.user.roleGroups?.map((roleGroup) => {
      this.addPermissions(roleGroup);
    });

    this.gridData = { data: this.permissions, total: this.permissions.length };
  }

  addPermissions(roleGroup: RoleGroup) {
    roleGroup.roles?.forEach((role) => {
      role.permissions?.forEach((permission) => {
        this.permissions.push({
          roleGroupName: roleGroup.name!,
          roleName: role.name!,
          permissionName: permission.name!,
        });
      });
    });
  }
}

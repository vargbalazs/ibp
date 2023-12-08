import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Role } from '../../../models/role.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RoleService } from '../../../services/role.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import AdminPermissions from 'src/app/core/enums/permissions/admin-perm.enum';

@Component({
  selector: 'role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent extends Crud<Role> implements OnInit {
  constructor(
    private roleService: RoleService,
    notifyService: CustomNotificationService,
    loaderService: LoaderService,
    msgDialogService: MsgDialogService
  ) {
    super(roleService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.permission = AdminPermissions.ADMIN;
    this.gridData = { data: [], total: 0 };
    this.roleService.getRoles(AdminPermissions.ADMIN).subscribe((roles) => {
      if (roles) this.gridData = { data: roles, total: roles.length };
    });
  }
}

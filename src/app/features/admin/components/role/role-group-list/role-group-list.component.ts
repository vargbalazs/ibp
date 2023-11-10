import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { RoleGroup } from '../../../models/rolegroup.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RoleGroupService } from '../../../services/rolegroup.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'rolegroup-list',
  templateUrl: './role-group-list.component.html',
  styleUrls: ['./role-group-list.component.css'],
})
export class RoleGroupListComponent extends Crud<RoleGroup> implements OnInit {
  constructor(
    private roleGroupService: RoleGroupService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(roleGroupService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    this.roleGroupService.getRoleGroups().subscribe((roleGroups) => {
      if (roleGroups)
        this.gridData = { data: roleGroups, total: roleGroups.length };
    });
  }
}

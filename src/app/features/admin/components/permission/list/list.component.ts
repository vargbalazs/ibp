import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Permission } from '../../../models/permission.model';
import { Module } from '../../../models/module.model';
import { SubModule } from '../../../models/submodule.model';
import { Operation } from '../../../models/operation.model';
import { Action } from '../../../models/action.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { ModuleService } from '../../../services/module.service';
import { OperationService } from '../../../services/operation.service';
import { ActionService } from '../../../services/action.service';
import { PermissionService } from '../../../services/permission.service';
import { first, forkJoin } from 'rxjs';

@Component({
  selector: 'permissions-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class PermissionListComponent
  extends Crud<Permission>
  implements OnInit
{
  modules!: Module[];
  subModules!: SubModule[];
  operations!: Operation[];
  actions!: Action[];
  permissions!: Permission[];

  constructor(
    private permissionService: PermissionService,
    private moduleService: ModuleService,
    private operationService: OperationService,
    private actionService: ActionService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(permissionService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    forkJoin({
      permissions: this.permissionService
        .getPermissionsWithDetails()
        .pipe(first()),
      modules: this.moduleService.getModulesWithSubModules().pipe(first()),
      operations: this.operationService.getOperations().pipe(first()),
      actions: this.actionService.getActions('ADMIN').pipe(first()),
    }).subscribe(({ permissions, modules, operations, actions }) => {
      if (permissions) {
        this.gridData = { data: permissions, total: permissions.length };
        this.modules = modules;
        this.operations = operations;
        this.actions = actions;
      }
    });
  }
}

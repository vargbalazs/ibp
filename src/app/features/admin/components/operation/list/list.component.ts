import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Operation } from '../../../models/operation.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { OperationService } from '../../../services/operation.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { ModuleService } from '../../../services/module.service';
import { first, forkJoin } from 'rxjs';
import { Module } from '../../../models/module.model';
import AdminPermissions from 'src/app/core/enums/permissions/admin-perm.enum';

@Component({
  selector: 'operation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent extends Crud<Operation> implements OnInit {
  modules!: Module[];

  constructor(
    private operationService: OperationService,
    private moduleService: ModuleService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(operationService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.permission = AdminPermissions.ADMIN;
    this.gridData = { data: [], total: 0 };
    forkJoin({
      modules: this.moduleService
        .getModulesWithSubModules(AdminPermissions.ADMIN)
        .pipe(first()),
      operations: this.operationService
        .getOperations(AdminPermissions.ADMIN)
        .pipe(first()),
    }).subscribe(({ modules, operations }) => {
      this.modules = modules;
      if (operations) {
        this.gridData = { data: operations, total: operations.length };
      }
    });
  }
}

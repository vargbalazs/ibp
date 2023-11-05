import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Module } from '../../../models/module.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModuleService } from '../../../services/module.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css'],
})
export class ModuleListComponent extends Crud<Module> implements OnInit {
  constructor(
    private moduleService: ModuleService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(moduleService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    this.moduleService.getModules().subscribe((modules) => {
      if (modules) this.gridData = { data: modules, total: modules.length };
    });
  }
}

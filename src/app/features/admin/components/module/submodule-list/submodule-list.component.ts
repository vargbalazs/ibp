import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { SubModule } from '../../../models/submodule.model';
import { Module } from '../../../models/module.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SubModuleService } from '../../../services/submodule.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { ModuleService } from '../../../services/module.service';
import { first, forkJoin } from 'rxjs';

@Component({
  selector: 'submodule-list',
  templateUrl: './submodule-list.component.html',
  styleUrls: ['./submodule-list.component.css'],
})
export class SubmoduleListComponent extends Crud<SubModule> implements OnInit {
  modules!: Module[];

  constructor(
    private subModuleService: SubModuleService,
    private moduleService: ModuleService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(subModuleService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    forkJoin({
      subModules: this.subModuleService.getSubModules().pipe(first()),
      modules: this.moduleService.getModules().pipe(first()),
    }).subscribe(({ subModules, modules }) => {
      if (subModules) {
        this.gridData = { data: subModules, total: subModules.length };
        this.modules = modules;
      }
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Operation } from '../../../models/operation.model';
import { Module } from '../../../models/module.model';
import { TreeItem, TreeViewComponent } from '@progress/kendo-angular-treeview';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { OperationService } from '../../../services/operation.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { ModuleService } from '../../../services/module.service';
import { SubModule } from '../../../models/submodule.model';
import { catchError, first, forkJoin, of } from 'rxjs';
import { SVGIcon, trashIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'operation-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css'],
})
export class HierarchyComponent extends Crud<Operation> implements OnInit {
  filterTerm = '';
  modules: Module[] = [];
  expandedKeys: string[] = [];
  selectedKeys: string[] = [];
  isItemExpanded = (_: any, index: string) =>
    this.expandedKeys.indexOf(index) > -1;
  isItemSelected = (_: any, index: string) =>
    this.selectedKeys.indexOf(index) > -1;

  @ViewChild('treeview') treeview!: TreeViewComponent;
  @ViewChild('contextMenu') trvContextMenu!: ContextMenuComponent;

  svgDelete: SVGIcon = trashIcon;

  contextMenuItems: any[] = [
    {
      text: 'Funkció eltávolítása',
      svgIcon: this.svgDelete,
      tag: 'deleteFunction',
      disabled: false,
    },
  ];

  contextItem!: Operation;

  constructor(
    private operationService: OperationService,
    private moduleService: ModuleService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(operationService, notifyService, loaderService, msgDialogService);
    this.expandedKeys = [];
  }

  ngOnInit(): void {
    this.loadTreeview();
  }

  nodeClick(e: any) {
    const item = e.item.dataItem;
    const index = e.item.index;
    if (this.isItemExpanded(item, index)) {
      this.treeview.collapseNode(item, index);
    } else {
      this.treeview.expandNode(item, index);
    }
    if (e.type === 'contextmenu') {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();
      if (!e.item.dataItem.subModules) {
        this.selectedKeys = [index];
        const subModule = <SubModule>e.item.dataItem;
        this.contextItem = subModule;
        this.trvContextMenu.show({
          left: originalEvent.pageX,
          top: originalEvent.pageY,
        });
      }
    }
  }

  loadTreeview() {
    forkJoin({
      modules: this.moduleService.getModulesWithSubModules().pipe(first()),
      operations: this.operationService.getOperations().pipe(first()),
    }).subscribe(({ modules, operations }) => {
      for (let i = 0; i <= modules.length - 1; i++) {
        modules[i].subModules?.forEach((sm) => (sm.subModules = []));
        for (let j = 0; j <= operations.length - 1; j++) {
          if (
            modules[i].subModules?.some(
              (sm) => sm.id === operations[j].subModule!.id
            )
          ) {
            modules[i].subModules
              ?.filter((sm) => sm.id === operations[j].subModule!.id)[0]
              .subModules?.push(operations[j]);
          }
        }
      }
      this.modules = modules;
    });
  }

  onContextMenuItemSelect({ item }: { item: any }): void {
    this.operationService
      .delete(this.contextItem.id!)
      .pipe(
        catchError(() => {
          this.notifyService.showNotification(
            5000,
            'error',
            'Törlés nem sikerült!',
            'A funkcióhoz tartozik legalább egy jogosultság.'
          );
          return of();
        })
      )
      .subscribe((id) => {
        this.notifyService.showNotification(
          5000,
          'success',
          'Sikeres törlés!',
          'A funkció sikeresen el lett távolítva az adott almodulból.'
        );
        //this.loadTreeview();
        this.removeOperation();
      });
  }

  onSelectionChange(event: TreeItem) {
    if (event.dataItem.subModules) return;
    this.selectedKeys = [event.index];
  }

  removeOperation() {
    const selectedModule = this.modules.find(
      (module) => module.id === this.contextItem.subModule!.module.id
    )!;
    const selectedSubModule = selectedModule?.subModules?.find(
      (subModule) => subModule.id === this.contextItem.subModule!.id
    )!;
    selectedSubModule!.subModules = selectedSubModule!.subModules!.filter(
      (subModule) => subModule.id !== this.contextItem.id
    );
    selectedModule!.subModules = selectedModule!.subModules!.map((subModule) =>
      subModule.id !== this.contextItem.subModule!.id
        ? subModule
        : selectedSubModule
    );
    this.modules = this.modules.map((module) =>
      module.id !== this.contextItem.subModule!.module.id
        ? module
        : selectedModule
    );
  }
}

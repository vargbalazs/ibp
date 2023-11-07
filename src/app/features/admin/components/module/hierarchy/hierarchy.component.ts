import { Component, OnInit, ViewChild } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { SubModule } from '../../../models/submodule.model';
import { Module } from '../../../models/module.model';
import { TreeItem, TreeViewComponent } from '@progress/kendo-angular-treeview';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SubModuleService } from '../../../services/submodule.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { ModuleService } from '../../../services/module.service';
import { SVGIcon, trashIcon } from '@progress/kendo-svg-icons';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'module-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css'],
})
export class HierarchyComponent extends Crud<SubModule> implements OnInit {
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
      text: 'Almodul eltávolítása',
      svgIcon: this.svgDelete,
      tag: 'deleteRole',
      disabled: false,
    },
  ];
  contextItem!: SubModule;

  constructor(
    private subModuleService: SubModuleService,
    private moduleService: ModuleService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(subModuleService, notifyService, loaderService, msgDialogService);
    this.expandedKeys = [];
  }

  ngOnInit(): void {
    this.loadTreeview();
  }

  loadTreeview() {
    this.moduleService.getModulesWithSubModules().subscribe((modules) => {
      this.modules = modules;
    });
  }

  removeSubModule() {
    const selectedModule = this.modules.find(
      (module) => module.id === this.contextItem.module.id
    )!;
    selectedModule.subModules = selectedModule.subModules.filter(
      (subModule) => subModule.id !== this.contextItem.id
    );
    this.modules = this.modules.map((module) =>
      module.id !== selectedModule.id ? module : selectedModule
    );
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

  onContextMenuItemSelect({ item }: { item: any }): void {
    this.subModuleService
      .delete(this.contextItem.id!)
      .pipe(
        catchError(() => {
          this.notifyService.showNotification(
            5000,
            'error',
            'Törlés nem sikerült!',
            'Az almodulhoz tartozik legalább egy tranzakció.'
          );
          return of();
        })
      )
      .subscribe((id) => {
        this.notifyService.showNotification(
          5000,
          'success',
          'Sikeres törlés!',
          'Az almodul sikeresen el lett távolítva az adott modulból.'
        );
        //this.loadTreeview();
        this.removeSubModule();
      });
  }

  onSelectionChange(event: TreeItem) {
    if (event.dataItem.subModules) return;
    this.selectedKeys = [event.index];
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Role } from '../../../models/role.model';
import { RoleGroup } from '../../../models/rolegroup.model';
import { TreeItem, TreeViewComponent } from '@progress/kendo-angular-treeview';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RoleService } from '../../../services/role.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { first, forkJoin } from 'rxjs';
import { SVGIcon, trashIcon } from '@progress/kendo-svg-icons';
import { AssignPermission } from '../../../models/assign-permission.model';
import { Permission } from '../../../models/permission.model';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.css'],
})
export class RolesAndPermissionsComponent
  extends Crud<AssignPermission>
  implements OnInit
{
  filterTerm = '';
  permissions: Permission[] = [];
  roles: Role[] = [];
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
      text: 'Jogosultság eltávolítása a szerepből',
      svgIcon: this.svgDelete,
      tag: 'deletePermission',
      disabled: false,
    },
  ];
  contextItem!: Permission;

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(permissionService, notifyService, loaderService, msgDialogService);
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
      if (!e.item.dataItem.permissions) {
        this.selectedKeys = [index];
        const permission = <Permission>e.item.dataItem;
        permission.roleId = this.getParent(index).id;
        this.contextItem = permission;
        this.trvContextMenu.show({
          left: originalEvent.pageX,
          top: originalEvent.pageY,
        });
      }
    }
  }

  showAssignForm() {
    this.addHandler();
  }

  override saveHandler(assignPermission: AssignPermission) {
    this.permissionService
      .assignToRole(assignPermission.roleId!, assignPermission.permissionId!)
      .subscribe((resp) => {
        this.notifyService.showNotification(
          5000,
          'success',
          'Sikeres mentés!',
          'Az új elem megtalálható a listában.'
        );
        this.resetDataItem();
        this.loadTreeview();
      });
  }

  loadTreeview() {
    forkJoin({
      roles: this.roleService.getRoles().pipe(first()),
      permissions: this.permissionService.getPermissions().pipe(first()),
    }).subscribe(({ roles, permissions }) => {
      this.roles = roles;
      this.permissions = permissions;
    });
  }

  onContextMenuItemSelect({ item }: { item: any }): void {
    this.permissionService
      .removeFromRole(this.contextItem.roleId!, this.contextItem.id!)
      .subscribe((res) => {
        this.notifyService.showNotification(
          5000,
          'success',
          'Sikeres törlés!',
          'A jogosultság sikeresen el lett távolítva az adott csoportból.'
        );
        // this.loadTreeview();
        this.removePermission();
      });
  }

  onSelectionChange(event: TreeItem) {
    if (event.dataItem.roles) return;
    this.selectedKeys = [event.index];
  }

  getParent(childIndex: string): RoleGroup {
    const parentIndex = childIndex.substring(0, childIndex.lastIndexOf('_'));
    return this.roles[+parentIndex];
  }

  removePermission() {
    const selectedRole = this.roles.find(
      (role) => role.id === this.contextItem.roleId
    )!;
    selectedRole.permissions = selectedRole.permissions!.filter(
      (permission) => permission.id !== this.contextItem.id
    );
    this.roles = this.roles.map((role) =>
      role.id !== selectedRole.id ? role : selectedRole
    );
  }
}

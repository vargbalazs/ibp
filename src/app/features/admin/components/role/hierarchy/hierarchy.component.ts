import { Component, OnInit, ViewChild } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { AssignRole } from '../../../models/assign-role.model';
import { Role } from '../../../models/role.model';
import { RoleGroup } from '../../../models/rolegroup.model';
import { TreeItem, TreeViewComponent } from '@progress/kendo-angular-treeview';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RoleService } from '../../../services/role.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { RoleGroupService } from '../../../services/rolegroup.service';
import { catchError, first, forkJoin, of } from 'rxjs';
import { SVGIcon, trashIcon } from '@progress/kendo-svg-icons';
import AdminPermissions from 'src/app/core/enums/permissions/admin-perm.enum';

@Component({
  selector: 'hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css'],
})
export class AssignToGroupComponent extends Crud<AssignRole> implements OnInit {
  filterTerm = '';
  roles: Role[] = [];
  roleGroups: RoleGroup[] = [];
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
      text: 'Szerep eltávolítása a csoportból',
      svgIcon: this.svgDelete,
      tag: 'deleteRole',
      disabled: false,
    },
  ];
  contextItem!: Role;

  constructor(
    private roleService: RoleService,
    private roleGroupService: RoleGroupService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(roleService, notifyService, loaderService, msgDialogService);
    this.expandedKeys = [];

    this.customSaveFn = function customSave(assignRole: AssignRole) {
      this.roleService
        .assignToRoleGroup(
          assignRole.roleGroupId!,
          assignRole.roleId!,
          AdminPermissions.ADMIN
        )
        .pipe(
          catchError((err) => {
            this.cancelHandler();
            return of();
          })
        )
        .subscribe((resp) => {
          this.notifyService.showNotification(
            'normal',
            5000,
            'success',
            'Sikeres mentés!',
            'Az új elem megtalálható a listában.'
          );
          this.resetDataItem();
          this.loadTreeview();
        });
    };
  }

  ngOnInit(): void {
    this.loadTreeview();
    this.permission = AdminPermissions.ADMIN;
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
      if (!e.item.dataItem.roles) {
        this.selectedKeys = [index];
        const role = <Role>e.item.dataItem;
        role.roleGroupId = this.getParent(index).id;
        this.contextItem = role;
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

  loadTreeview() {
    forkJoin({
      roles: this.roleService.getRoles(AdminPermissions.ADMIN).pipe(first()),
      roleGroups: this.roleGroupService
        .getRoleGroups(AdminPermissions.ADMIN)
        .pipe(first()),
    }).subscribe(({ roles, roleGroups }) => {
      this.roles = roles;
      this.roleGroups = roleGroups;
    });
  }

  onContextMenuItemSelect({ item }: { item: any }): void {
    this.roleService
      .removeFromRoleGroup(
        this.contextItem.roleGroupId!,
        this.contextItem.id!,
        AdminPermissions.ADMIN
      )
      .subscribe((roleId) => {
        this.notifyService.showNotification(
          'normal',
          5000,
          'success',
          'Sikeres törlés!',
          'A szerep sikeresen el lett távolítva az adott csoportból.'
        );
        // this.loadTreeview();
        this.removeRole();
      });
  }

  onSelectionChange(event: TreeItem) {
    if (event.dataItem.roles) return;
    this.selectedKeys = [event.index];
  }

  getParent(childIndex: string): RoleGroup {
    const parentIndex = childIndex.substring(0, childIndex.lastIndexOf('_'));
    return this.roleGroups[+parentIndex];
  }

  removeRole() {
    const selectedRoleGroup = this.roleGroups.find(
      (roleGroup) => roleGroup.id === this.contextItem.roleGroupId
    )!;
    selectedRoleGroup.roles = selectedRoleGroup.roles!.filter(
      (role) => role.id !== this.contextItem.id
    );
    this.roleGroups = this.roleGroups.map((roleGroup) =>
      roleGroup.id !== selectedRoleGroup.id ? roleGroup : selectedRoleGroup
    );
  }
}

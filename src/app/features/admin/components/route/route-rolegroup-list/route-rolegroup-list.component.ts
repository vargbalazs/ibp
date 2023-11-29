import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { RoleGroupService } from '../../../services/rolegroup.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { RouteService } from '../../../services/route.service';
import { BehaviorSubject, catchError, first, forkJoin, of } from 'rxjs';
import { AssignRoleGroupToRoute } from '../../../interfaces/assign-rolegroup-to-route.interface';
import { RoleGroup } from '../../../models/rolegroup.model';
import { Route } from '../../../models/route.model';
import { AssignRoute } from '../../../models/assign-route.model';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DialogAction } from 'src/app/shared/interfaces/dialog-action.interface';
import { DialogActionsEnum } from 'src/app/shared/components/custom-dialog/dialog-actions.enum';

@Component({
  selector: 'route-rolegroup-list',
  templateUrl: './route-rolegroup-list.component.html',
  styleUrls: ['./route-rolegroup-list.component.css'],
})
export class RouteRoleGroupListComponent implements OnInit {
  gridData!: GridDataResult;
  loadingOverlayVisible!: BehaviorSubject<boolean>;
  dialogOpened: boolean = false;
  active: boolean = false;
  routesWithRoleGroups: AssignRoleGroupToRoute[] = [];
  routes: Route[] = [];
  roleGroups: RoleGroup[] = [];
  dialogRef!: DialogRef;
  dialogContainer!: ViewContainerRef;

  constructor(
    private roleGroupService: RoleGroupService,
    private routeService: RouteService,
    private loaderService: LoaderService,
    private notifyService: CustomNotificationService,
    private msgDialogService: MsgDialogService
  ) {
    this.loadingOverlayVisible = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    forkJoin({
      routes: this.routeService.getRoutes().pipe(first()),
      roleGroups: this.roleGroupService.getRoleGroups().pipe(first()),
    }).subscribe(({ routes, roleGroups }) => {
      if (routes) {
        this.routes = routes;
        this.roleGroups = roleGroups;
        this.addRoleGroups(routes);
        this.gridData = {
          data: this.routesWithRoleGroups,
          total: this.routesWithRoleGroups.length,
        };
      }
    });
  }

  addRoleGroups(routes: Route[]) {
    routes.forEach((route) => {
      route.roleGroups?.forEach((roleGroup) => {
        this.routesWithRoleGroups.push({
          roleGroupId: roleGroup.id!,
          roleGroupName: roleGroup.name!,
          routeId: route.id,
          routeName: route.name,
        });
      });
    });
  }

  openAssignDialog() {
    this.active = true;
    this.dialogOpened = true;
  }

  saveHandler(entity: AssignRoute, type: string) {
    this.roleGroupService
      .assignRoleGroupToRoute(entity.roleGroupId!, entity.routeId!)
      .pipe(
        catchError((err) => {
          this.active = false;
          this.dialogOpened = false;
          return of();
        })
      )
      .subscribe((res) => {
        this.active = false;
        this.dialogOpened = false;
        this.routesWithRoleGroups.push({
          roleGroupId: entity.roleGroupId!,
          roleGroupName: entity.roleGroup?.name!,
          routeId: entity.routeId!,
          routeName: entity.route?.name!,
        });
        this.gridData.data = this.routesWithRoleGroups;
        this.notifyService.showNotification(
          'normal',
          5000,
          'success',
          'Sikeres mentés!',
          'Az új elem megtalálható a listában.'
        );
      });
  }

  removeHandler(entity: AssignRoute, type: string) {
    this.dialogOpened = true;
    this.dialogRef = this.msgDialogService.showDialog(
      this.dialogContainer,
      'Elem törlése',
      'Valóban törölni szeretnéd a kiválasztott elemet? Minden adat véglegesen törlődik. Ez a művelet nem visszavonható.',
      'error',
      'Igen',
      true
    );
    this.dialogRef.dialog.instance.close.subscribe((result) => {
      if ((result as DialogAction).action === DialogActionsEnum.Cancel) {
        this.closeDialog();
      }
      if ((result as DialogAction).action === DialogActionsEnum.Yes) {
        this.remove(entity);
      }
    });
  }

  cancelHandler() {
    this.active = false;
    this.dialogOpened = false;
  }

  closeDialog() {
    this.dialogRef.close();
    this.dialogOpened = false;
  }

  remove(entity: AssignRoute) {
    this.roleGroupService
      .removeRoleGroupFromRoute(entity.roleGroupId!, entity.routeId!)
      .pipe(
        catchError((err) => {
          this.closeDialog();
          return of();
        })
      )
      .subscribe((res) => {
        this.closeDialog();
        this.routesWithRoleGroups = this.routesWithRoleGroups.filter(
          (item: AssignRoleGroupToRoute) => {
            const deletedId =
              entity.roleGroupId!.toString() + entity.routeId!.toString();
            const id = item.roleGroupId!.toString() + item.routeId!.toString();
            return id !== deletedId;
          }
        );
        this.gridData.data = this.routesWithRoleGroups;
        this.notifyService.showNotification(
          'normal',
          5000,
          'success',
          'Sikeres törlés!',
          'A kiválasztott elem eltávolításra került a listából.'
        );
      });
  }
}

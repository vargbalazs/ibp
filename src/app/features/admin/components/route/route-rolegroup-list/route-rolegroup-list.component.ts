import { Component, OnInit } from '@angular/core';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { RoleGroupService } from '../../../services/rolegroup.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { RouteService } from '../../../services/route.service';
import { BehaviorSubject } from 'rxjs';
import { AssignRoleGroupToRoute } from '../../../interfaces/assign-rolegroup-to-route.interface';
import { RoleGroup } from '../../../models/rolegroup.model';
import { Route } from '../../../models/route.model';

@Component({
  selector: 'route-rolegroup-list',
  templateUrl: './route-rolegroup-list.component.html',
  styleUrls: ['./route-rolegroup-list.component.css'],
})
export class RouteRoleGroupListComponent implements OnInit {
  gridData!: GridDataResult;
  loadingOverlayVisible!: BehaviorSubject<boolean>;
  dialogOpened: boolean = false;
  routesWithRoleGroups: AssignRoleGroupToRoute[] = [];

  constructor(
    private roleGroupService: RoleGroupService,
    private routeService: RouteService,
    private loaderService: LoaderService,
    private notifyService: CustomNotificationService,
    private msgDialogService: MsgDialogService
  ) {}

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    this.routeService.getRoutes().subscribe((routes) => {
      if (routes) {
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
}

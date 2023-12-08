import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Route } from '../../../models/route.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RouteService } from '../../../services/route.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import AdminPermissions from 'src/app/core/enums/permissions/admin-perm.enum';

@Component({
  selector: 'route-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class RouteListComponent extends Crud<Route> implements OnInit {
  constructor(
    private routeService: RouteService,
    notifyService: CustomNotificationService,
    loaderService: LoaderService,
    msgDialogService: MsgDialogService
  ) {
    super(routeService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.permission = AdminPermissions.ADMIN;
    this.gridData = { data: [], total: 0 };
    this.routeService.getRoutes(AdminPermissions.ADMIN).subscribe((routes) => {
      if (routes) {
        this.gridData = { data: routes, total: routes.length };
      }
    });
  }
}

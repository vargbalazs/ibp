import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { RootComponent } from './components/root/root.component';
import { UserListComponent } from './components/user/list/list.component';
import { ActionListComponent } from './components/action/list/list.component';
import { ModuleRootComponent } from './components/module/root/root.component';
import { OperationRootComponent } from './components/operation/root/root.component';
import { PermissionListComponent } from './components/permission/list/list.component';
import { RoleRootComponent } from './components/role/root/root.component';
import { RouteRootComponent } from './components/route/root/root.component';
import { routeGuard } from 'src/app/core/guards/route.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [routeGuard()],
    children: [
      {
        path: 'admin/root',
        component: RootComponent,
      },
      {
        path: 'admin/users',
        component: UserListComponent,
      },
      {
        path: 'admin/actions',
        component: ActionListComponent,
      },
      {
        path: 'admin/modules',
        component: ModuleRootComponent,
      },
      {
        path: 'admin/operations',
        component: OperationRootComponent,
      },
      {
        path: 'admin/permissions',
        component: PermissionListComponent,
      },
      {
        path: 'admin/roles',
        component: RoleRootComponent,
      },
      {
        path: 'admin/routes',
        component: RouteRootComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

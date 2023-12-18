import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { BuListComponent } from './components/bu/list/list.component';
import { routeGuard } from 'src/app/core/guards/route.guard';
import { CustomerListComponent } from './components/customer/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [routeGuard()],
    children: [
      {
        path: 'masterdata/bus',
        component: BuListComponent,
      },
      {
        path: 'masterdata/customers',
        component: CustomerListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}

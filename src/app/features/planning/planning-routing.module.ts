import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { routeGuard } from 'src/app/core/guards/route.guard';
import { PlanningSheetComponent } from './components/planning-sheet/planning-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [routeGuard()],
    children: [
      {
        path: 'planning/planning-sheet',
        component: PlanningSheetComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}

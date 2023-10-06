import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthrootComponent } from './authroot.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthrootComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRootRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthrootComponent } from './authroot.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthrootComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRootRoutingModule {}

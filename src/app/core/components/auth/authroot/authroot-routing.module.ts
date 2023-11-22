import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthrootComponent } from './authroot.component';
import { LoginComponent } from '../login/login.component';
import { ForgotpwdComponent } from '../forgotpwd/forgotpwd.component';
import { BasicDataComponent } from '../signup/basic-data/basic-data.component';
import { LoginDataComponent } from '../signup/login-data/login-data.component';
import { FirstLoginComponent } from '../firstlogin/firstlogin.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthrootComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'loginPage' },
      },
      {
        path: 'forgotpwd',
        component: ForgotpwdComponent,
        data: { animation: 'forgotPwdPage' },
      },
      {
        path: 'signup/basic-data',
        component: BasicDataComponent,
        data: { animation: 'signupPageBasic' },
      },
      {
        path: 'signup/login-data',
        component: LoginDataComponent,
        data: { animation: 'signupPageLogin' },
      },
      {
        path: 'changepwd',
        component: FirstLoginComponent,
        data: { animation: 'changePwdPage' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRootRoutingModule {}

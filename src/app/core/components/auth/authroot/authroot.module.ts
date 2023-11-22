import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRootRoutingModule } from './authroot-routing.module';
import { AuthrootComponent } from './authroot.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LoginModule } from '../login/login.module';
import { ForgotpwdModule } from '../forgotpwd/forgotpwd.module';
import { SignupModule } from '../signup/signup.module';
import { FirstLoginModule } from '../firstlogin/firstlogin.module';

@NgModule({
  declarations: [AuthrootComponent],
  imports: [
    CommonModule,
    AuthRootRoutingModule,
    LoginModule,
    ForgotpwdModule,
    SignupModule,
    LayoutModule,
    FirstLoginModule,
  ],
  exports: [AuthrootComponent],
})
export class AuthrootModule {}

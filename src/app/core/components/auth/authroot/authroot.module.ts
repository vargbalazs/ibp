import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRootRoutingModule } from './authroot-routing.module';
import { AuthrootComponent } from './authroot.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [AuthrootComponent],
  imports: [CommonModule, AuthRootRoutingModule, LoginModule, LayoutModule],
  exports: [AuthrootComponent],
})
export class AuthrootModule {}

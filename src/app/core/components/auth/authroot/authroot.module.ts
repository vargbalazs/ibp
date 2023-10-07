import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRootRoutingModule } from './authroot-routing.module';
import { AuthrootComponent } from './authroot.component';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [AuthrootComponent],
  imports: [CommonModule, AuthRootRoutingModule, LayoutModule],
  exports: [AuthrootComponent],
})
export class AuthrootModule {}

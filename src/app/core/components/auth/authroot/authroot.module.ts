import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRootRoutingModule } from './authroot-routing.module';
import { AuthrootComponent } from './authroot.component';

@NgModule({
  declarations: [AuthrootComponent],
  imports: [CommonModule, AuthRootRoutingModule],
  exports: [AuthrootComponent],
})
export class AuthrootModule {}

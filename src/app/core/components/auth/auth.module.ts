import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthrootModule } from './authroot/authroot.module';
import { AuthrootComponent } from './authroot/authroot.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthrootModule],
  exports: [AuthrootComponent],
  providers: [],
})
export class AuthModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthrootModule } from './authroot/authroot.module';
import { AuthrootComponent } from './authroot/authroot.component';
import { AuthService } from '../../services/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthrootModule],
  exports: [AuthrootComponent],
  providers: [AuthService],
})
export class AuthModule {}

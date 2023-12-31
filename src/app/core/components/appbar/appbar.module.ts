import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppbarComponent } from './appbar.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { AuthService } from '../../services/auth.service';

@NgModule({
  declarations: [AppbarComponent],
  imports: [CommonModule, NavigationModule, LayoutModule],
  providers: [AuthService],
  exports: [AppbarComponent],
})
export class AppbarModule {}

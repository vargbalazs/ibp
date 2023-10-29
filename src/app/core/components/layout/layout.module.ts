import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AppbarModule } from '../appbar/appbar.module';
import { LayoutService } from '../../services/layout.service';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, AppbarModule, SidebarModule],
  providers: [LayoutService],
  exports: [LayoutComponent],
})
export class LayoutModule {}

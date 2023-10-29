import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { LayoutModule as KendoLayoutModule } from '@progress/kendo-angular-layout';
import { SidemenuModule } from '../sidemenu/sidemenu.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, KendoLayoutModule, SidemenuModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AppbarModule } from '../appbar/appbar.module';
import { LayoutService } from '../../services/layout.service';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, AppbarModule],
  providers: [LayoutService],
  exports: [LayoutComponent],
})
export class LayoutModule {}

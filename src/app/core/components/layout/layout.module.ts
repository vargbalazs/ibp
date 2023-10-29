import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AppbarModule } from '../appbar/appbar.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, AppbarModule],
  providers: [],
  exports: [LayoutComponent],
})
export class LayoutModule {}

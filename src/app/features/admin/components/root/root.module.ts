import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root.component';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [RootComponent],
  imports: [CommonModule, LayoutModule],
  exports: [RootComponent],
})
export class RootModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  declarations: [SidemenuComponent],
  imports: [CommonModule, TreeViewModule, InputsModule],
  exports: [SidemenuComponent],
})
export class SidemenuModule {}

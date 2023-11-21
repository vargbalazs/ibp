import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { UserPermissionsComponent } from './permissions.component';

@NgModule({
  declarations: [UserPermissionsComponent],
  imports: [CommonModule, GridModule],
  exports: [UserPermissionsComponent],
})
export class PermissionsModule {}

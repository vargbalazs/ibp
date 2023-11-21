import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BasicDataModule } from '../basic-data/basic-data.module';
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { DraggableModule } from 'src/app/shared/directives/draggable/draggable.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonsModule,
    LayoutModule,
    BasicDataModule,
    RolesModule,
    PermissionsModule,
    DraggableModule,
  ],
  exports: [DetailsComponent],
})
export class DetailsModule {}

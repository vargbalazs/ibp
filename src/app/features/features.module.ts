import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { MasterDataModule } from './masterdata/masterdata.module';
import { PlanningModule } from './planning/planning.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminModule, MasterDataModule, PlanningModule],
  providers: [],
  exports: [],
})
export class FeaturesModule {}

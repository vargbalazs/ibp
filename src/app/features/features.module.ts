import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { MasterDataModule } from './masterdata/masterdata.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminModule, MasterDataModule],
  providers: [],
  exports: [],
})
export class FeaturesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MasterDataRoutingModule } from './masterdata/masterdata-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, MasterDataRoutingModule],
  providers: [],
  exports: [],
})
export class FeaturesRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MasterDataRoutingModule } from './masterdata/masterdata-routing.module';
import { PlanningRoutingModule } from './planning/planning-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MasterDataRoutingModule,
    PlanningRoutingModule,
  ],
  providers: [],
  exports: [],
})
export class FeaturesRoutingModule {}

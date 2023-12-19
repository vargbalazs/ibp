import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuModule } from './components/bu/bu.module';
import { CustomerModule } from './components/customer/customer.module';
import { ProjectModule } from './components/project/project.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BuModule, CustomerModule, ProjectModule],
  providers: [],
  exports: [],
})
export class MasterDataModule {}

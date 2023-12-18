import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuModule } from './components/bu/bu.module';
import { CustomerModule } from './components/customer/customer.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BuModule, CustomerModule],
  providers: [],
  exports: [],
})
export class MasterDataModule {}

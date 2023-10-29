import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNotifyComponent } from './custom-notify.component';

@NgModule({
  declarations: [CustomNotifyComponent],
  imports: [CommonModule],
  exports: [CustomNotifyComponent],
})
export class CustomNofityModule {}

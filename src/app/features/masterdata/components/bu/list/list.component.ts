import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Bu } from '../../../models/bu.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { BuService } from '../../../services/bu.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'bu-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class BuListComponent extends Crud<Bu> implements OnInit {
  constructor(
    private buService: BuService,
    notifyService: CustomNotificationService,
    loaderService: LoaderService,
    msgDialogService: MsgDialogService
  ) {
    super(buService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    this.buService.getBus('VIEW_BU').subscribe((bus) => {
      if (bus) {
        this.gridData = { data: bus, total: bus.length };
      }
    });
  }
}

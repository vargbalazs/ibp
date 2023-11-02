import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Action } from '../../../models/action.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ActionService } from '../../../services/action.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'action-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ActionListComponent extends Crud<Action> implements OnInit {
  constructor(
    private actionService: ActionService,
    notifyService: CustomNotificationService
  ) {
    super(actionService, notifyService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    this.actionService.getActions().subscribe((actions) => {
      if (actions) {
        this.gridData = { data: actions, total: actions.length };
      }
    });
  }
}

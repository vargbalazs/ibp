import { Injectable } from '@angular/core';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';

@Injectable({ providedIn: 'root' })
export class MsgDialogService {
  constructor(private dialogService: DialogService) {}

  showDialog(
    title: string,
    descr: string,
    type: string,
    confirmButtonText: string,
    showCancel = false,
    closeOnAction = false
  ): DialogRef {
    const dialog: DialogRef = this.dialogService.open({
      content: CustomDialogComponent,
      width: 400,
      height: 150,
      preventAction(ev, dialogRef) {
        return !closeOnAction;
      },
    });

    const contentComponent = dialog.content.instance as CustomDialogComponent;
    contentComponent.title = title;
    contentComponent.descr = descr;
    contentComponent.type = type;
    contentComponent.confirmButtonText = confirmButtonText;
    contentComponent.showCancel = showCancel;

    return dialog;
  }
}

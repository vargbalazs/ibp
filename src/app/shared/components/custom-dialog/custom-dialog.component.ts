import { Component, Input, OnInit } from '@angular/core';
import { ButtonThemeColor } from '@progress/kendo-angular-buttons';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { DialogActionsEnum } from './dialog-actions.enum';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css'],
})
export class CustomDialogComponent extends DialogContentBase implements OnInit {
  iconClass = '';
  barClass = '';
  _type = '';
  buttonType: ButtonThemeColor = 'primary';
  dialogColor = '';
  isBusy: BehaviorSubject<boolean>;

  @Input() title = '';
  @Input() descr = '';
  @Input() set type(value: string) {
    this.iconClass = 'custom-dialog-' + value;
    this.barClass = 'custom-dialog-bar-' + value;
    this._type = value;
    this.buttonType = value === 'info' ? 'primary' : <ButtonThemeColor>value;
    this.dialogColor = value === 'info' ? 'blue' : value;
  }
  get type(): string {
    return this._type;
  }
  @Input() showCancel = false;
  @Input() confirmButtonText = 'Confirm';

  constructor(
    public override dialog: DialogRef,
    private loaderService: LoaderService
  ) {
    super(dialog);
    this.isBusy = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.dialog.dialog.instance.autoFocusedElement = '#primaryButton';
  }

  onCancelAction(): void {
    //this.dialog.close({ action: DialogActionsEnum.Cancel });
    this.dialog.dialog.instance.close.emit({
      action: DialogActionsEnum.Cancel,
    });
  }

  onConfirmAction(): void {
    // this.dialog.close({ action: DialogActionsEnum.Yes });
    // with this, we can interrupt closing the dialog, if we want
    this.dialog.dialog.instance.close.emit({ action: DialogActionsEnum.Yes });
  }
}

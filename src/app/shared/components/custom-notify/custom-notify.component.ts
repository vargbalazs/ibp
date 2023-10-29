import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-notify',
  templateUrl: './custom-notify.component.html',
  styleUrls: ['./custom-notify.component.css'],
})
export class CustomNotifyComponent {
  iconClass = '';
  barClass = '';
  _type = '';

  @Input() title = '';
  @Input() descr = '';
  @Input() set type(value: string) {
    this.iconClass = 'custom-notification-' + value;
    this.barClass = 'custom-notification-bar-' + value;
    this._type = value;
  }
  get type(): string {
    return this._type;
  }

  @Output() public close: EventEmitter<unknown> = new EventEmitter();

  closeNotification(event: Event): void {
    event.preventDefault();
    this.close.emit();
  }
}

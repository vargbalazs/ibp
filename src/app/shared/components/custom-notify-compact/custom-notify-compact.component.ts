import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-notify-compact',
  templateUrl: './custom-notify-compact.component.html',
  styleUrls: ['./custom-notify-compact.component.css'],
})
export class CustomNotifyCompactComponent {
  iconClass = '';
  barClass = '';
  _type = '';

  @Input() title = '';
  @Input() descr = '';
  @Input() set type(value: string) {
    this.iconClass = 'custom-notification-compact-' + value;
    this.barClass = 'custom-notification-compact-bar-' + value;
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

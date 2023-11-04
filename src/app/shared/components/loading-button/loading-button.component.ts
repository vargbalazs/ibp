import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

function toBehaviorSubject(value: boolean) {
  return new BehaviorSubject(value);
}

@Component({
  templateUrl: './loading-button.component.html',
  selector: 'loading-button',
})
export class LoadingButtonComponent {
  //private isBusy: BehaviorSubject<boolean>;

  @Input({ transform: toBehaviorSubject })
  showIndicator: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Input() buttonText: string = '';
}

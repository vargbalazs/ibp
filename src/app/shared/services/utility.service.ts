import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  changeControlState(form: FormGroup, controls: string[], enabled: boolean) {
    for (let i = 0; i <= controls.length - 1; i++) {
      if (enabled) {
        form.get(controls[i])?.enable();
      } else {
        form.get(controls[i])?.disable();
      }
    }
  }

  disableAllControls(form: FormGroup) {
    this.changeControlState(form, Object.keys(form.controls), false);
  }

  enableAllControls(form: FormGroup) {
    this.changeControlState(form, Object.keys(form.controls), true);
  }
}

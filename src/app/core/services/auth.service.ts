import { Injectable } from '@angular/core';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Injectable()
export class AuthService {
  togglePass(passwordInput: TextBoxComponent) {
    const inputEl = passwordInput.input.nativeElement;

    if (inputEl.type === 'password') {
      inputEl.type = 'text';
    } else {
      inputEl.type = 'password';
    }
  }
}

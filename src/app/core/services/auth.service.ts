import { Injectable } from '@angular/core';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { UserSignup } from '../models/user-signup.model';

@Injectable()
export class AuthService {
  private newUser!: UserSignup;

  togglePass(passwordInput: TextBoxComponent) {
    const inputEl = passwordInput.input.nativeElement;

    if (inputEl.type === 'password') {
      inputEl.type = 'text';
    } else {
      inputEl.type = 'password';
    }
  }

  setNewUser(user: UserSignup) {
    this.newUser = user;
  }

  getNewUser(): UserSignup {
    return this.newUser;
  }
}

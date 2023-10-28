import { Injectable } from '@angular/core';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { UserSignup } from '../models/user-signup.model';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { API_URL, USE_LOADING_SPINNER } from '../constants/app.constants';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

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

  userNameExists(userName: string) {
    return this.http.get<boolean>(`${API_URL}/users/username-exists`, {
      params: new HttpParams().set('user-name', userName),
      context: new HttpContext().set(USE_LOADING_SPINNER, false),
    });
  }

  userEmailExists(userEmail: string) {
    return this.http.get<boolean>(`${API_URL}/users/useremail-exists`, {
      params: new HttpParams().set('user-email', userEmail),
      context: new HttpContext().set(USE_LOADING_SPINNER, false),
    });
  }

  checkUserName(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      this.userNameExists(control.value).subscribe((res) => {
        if (res) {
          resolve({ userNameIsAlreadyInUse: res });
        } else {
          resolve(null);
        }
      });
    });
  }

  checkUserEmail(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      this.userEmailExists(control.value).subscribe((res) => {
        if (res) {
          resolve({ userEmailIsAlreadyInUse: res });
        } else {
          resolve(null);
        }
      });
    });
  }

  signUp(user: UserSignup) {
    return this.http.post<UserSignup>(`${API_URL}/users`, user);
  }
}

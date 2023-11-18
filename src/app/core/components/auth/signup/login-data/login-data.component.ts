import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserSignup } from 'src/app/core/models/user-signup.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html',
  styleUrls: [
    './login-data.component.css',
    '../../authroot/authroot.component.css',
  ],
})
export class LoginDataComponent implements OnInit {
  signupForm!: ReturnType<typeof this.initSignupForm>;
  userName = '';
  userEmail = '';
  backToBasicData = false;
  isBusy: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
    private customNotifyService: CustomNotificationService
  ) {
    this.isBusy = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.signupForm = this.initSignupForm();

    const user = this.authService.getNewUser();
    if (user) {
      this.signupForm.setValue(user);
    }

    this.signupForm.statusChanges.pipe().subscribe((status) => {
      if (status === 'VALID' && !this.backToBasicData) this.submitForm();
    });
  }

  initSignupForm() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [
          this.authService.checkUserName.bind(this.authService),
        ],
        updateOn: 'submit',
      }),
      userEmail: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this.authService.checkUserEmail.bind(this.authService),
        ],
        updateOn: 'submit',
      }),
    });
  }

  submitForm() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      const user = <UserSignup>this.signupForm.value;
      this.authService.signUp(user).subscribe((res) => {
        this.backToLogin();
        this.customNotifyService.showNotification(
          'normal',
          5000,
          'success',
          'Regisztráció',
          'A regisztráció sikeres volt. A bejelentkezéshez szükséges jelszót elküldtük a megadott e-mail címre.'
        );
      });
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    this.authService.setNewUser(new UserSignup());
    return false;
  }

  backToBasicDataForm() {
    this.signupForm.controls.userName.setValue(
      this.userName ? this.userName : this.signupForm.controls.userName.value
    );
    this.signupForm.controls.userEmail.setValue(
      this.userEmail ? this.userEmail : this.signupForm.controls.userEmail.value
    );
    this.authService.setNewUser(<UserSignup>this.signupForm.value);
    this.router.navigate(['/auth/signup/basic-data'], {
      skipLocationChange: true,
    });
    this.backToBasicData = true;
    return false;
  }

  userNameChange(value: string) {
    this.userName = value;
  }

  userEmailChange(value: string) {
    this.userEmail = value;
  }
}

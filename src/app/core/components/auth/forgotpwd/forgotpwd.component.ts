import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: [
    './forgotpwd.component.css',
    '../authroot/authroot.component.css',
  ],
})
export class ForgotpwdComponent implements OnInit {
  forgotPwdForm!: ReturnType<typeof this.initForgotPwdForm>;
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
    this.forgotPwdForm = this.initForgotPwdForm();
  }

  initForgotPwdForm() {
    return new FormGroup({
      userEmail: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      }),
    });
  }

  submitForm() {
    this.forgotPwdForm.markAllAsTouched();
    if (this.forgotPwdForm.valid) {
      const user = this.forgotPwdForm.value;
      this.authService
        .forgotPwd(user.userEmail!)
        .pipe(
          catchError((error) => {
            this.customNotifyService.showNotification(
              5000,
              'error',
              'Elfelejtett jelszó',
              'A megadott e-mail címmel nem volt regisztráció.'
            );
            return of();
          })
        )
        .subscribe({
          next: () =>
            this.customNotifyService.showNotification(
              5000,
              'success',
              'Elfelejtett jelszó',
              'Az új jelszót elküldtük a megadott e-mail címre.'
            ),
        });
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    return false;
  }
}

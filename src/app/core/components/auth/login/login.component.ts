import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { UserLogin } from 'src/app/core/models/user-login.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authroot/authroot.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: ReturnType<typeof this.initLoginForm>;
  passwordVisible = false;
  isBusy: BehaviorSubject<boolean>;

  @ViewChild('password') passwordInput!: TextBoxComponent;

  constructor(
    private authService: AuthService,
    private renderer2: Renderer2,
    private router: Router,
    private loaderService: LoaderService,
    private customNotifyService: CustomNotificationService
  ) {
    this.isBusy = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.loginForm = this.initLoginForm();
  }

  ngAfterViewInit(): void {
    this.passwordInput.input.nativeElement.type = 'password';
    this.renderer2.setAttribute(
      this.passwordInput.input.nativeElement,
      'autocomplete',
      'on'
    );
  }

  initLoginForm() {
    return new FormGroup({
      userEmail: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      rememberMe: new FormControl(),
    });
  }

  togglePass() {
    this.authService.togglePass(this.passwordInput);
    this.passwordVisible = !this.passwordVisible;
    return false;
  }

  showForgotPwdForm() {
    this.router.navigate(['/auth/forgotpwd'], { skipLocationChange: true });
    return false;
  }

  showCreateAccountForm() {
    this.router.navigate(['/auth/signup/basic-data'], {
      skipLocationChange: true,
    });
    return false;
  }

  submitForm() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const user = new UserLogin(
        this.loginForm.controls.userEmail.value!,
        this.loginForm.controls.password.value!
      );
      this.authService
        .login(user)
        .pipe(
          catchError((err) => {
            this.customNotifyService.showNotification(
              5000,
              'error',
              'Bejelentkezés',
              'Hibás e-mail cím vagy jelszó.'
            );
            return of();
          })
        )
        .subscribe((res) => {
          this.customNotifyService.showNotification(
            5000,
            'success',
            'Bejelentkezés',
            'A bejelentkezés sikeres.'
          );
          this.router.navigate(['home'], { skipLocationChange: true });
        });
    }
  }
}

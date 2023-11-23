import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { ChangePwdModel } from 'src/app/core/models/change-pwd.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminService } from 'src/app/features/admin/services/admin.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: [
    './firstlogin.component.css',
    '../authroot/authroot.component.css',
  ],
})
export class FirstLoginComponent implements OnInit, AfterViewInit {
  firstLoginForm!: ReturnType<typeof this.initFirstLoginForm>;
  isBusy: BehaviorSubject<boolean>;
  passwordVisible = false;
  confirmPasswordVisible = false;

  @ViewChild('password') passwordInput!: TextBoxComponent;
  @ViewChild('confirmPassword') confirmPasswordInput!: TextBoxComponent;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private adminService: AdminService,
    private authService: AuthService,
    private renderer2: Renderer2,
    private notifyService: CustomNotificationService
  ) {
    this.isBusy = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.firstLoginForm = this.initFirstLoginForm();
  }

  ngAfterViewInit(): void {
    this.passwordInput.input.nativeElement.type = 'password';
    this.renderer2.setAttribute(
      this.passwordInput.input.nativeElement,
      'autocomplete',
      'on'
    );
    this.confirmPasswordInput.input.nativeElement.type = 'password';
    this.renderer2.setAttribute(
      this.confirmPasswordInput.input.nativeElement,
      'autocomplete',
      'on'
    );
  }

  initFirstLoginForm() {
    return new FormGroup(
      {
        userId: new FormControl('', { validators: [Validators.required] }),
        password: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'submit',
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'submit',
        }),
      },
      { validators: [this.match('password', 'confirmPassword')] }
    );
  }

  submitForm() {
    this.firstLoginForm.markAllAsTouched();
    this.firstLoginForm.controls.userId.setValue(
      this.adminService.getUser().userId!
    );
    if (this.firstLoginForm.valid) {
      const formData = this.firstLoginForm.value as ChangePwdModel;
      this.authService.changePwd(formData).subscribe((res) => {
        this.router.navigate(['/home']);
        this.notifyService.showNotification(
          'normal',
          5000,
          'success',
          'Jelszó megváltoztatása',
          'A jelszó sikeresen megváltoztatásra került.'
        );
      });
    }
  }

  togglePassword() {
    this.authService.togglePass(this.passwordInput);
    this.passwordVisible = !this.passwordVisible;
    return false;
  }

  toggleConfirmPassword() {
    this.authService.togglePass(this.confirmPasswordInput);
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    return false;
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['notMatching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        return { notMatching: true };
      } else {
        return null;
      }
    };
  }
}

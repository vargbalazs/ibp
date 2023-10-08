import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {}

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
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: [
    './basic-data.component.css',
    '../../authroot/authroot.component.css',
  ],
})
export class BasicDataComponent implements OnInit {
  signupForm!: ReturnType<typeof this.initSignupForm>;
  passwordVisible = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.initSignupForm();
  }

  initSignupForm() {
    return new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      userName: new FormControl(''),
      userEmail: new FormControl(''),
    });
  }

  submitForm() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.router.navigate(['/auth/signup/login-data'], {
        skipLocationChange: true,
        state: { user: user },
      });
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    return false;
  }
}

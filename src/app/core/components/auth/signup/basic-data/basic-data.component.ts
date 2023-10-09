import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignup } from 'src/app/core/models/user-signup.model';
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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.initSignupForm();

    const user = this.authService.getNewUser();
    if (user) {
      this.signupForm.setValue(user);
    }
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
      const user = <UserSignup>this.signupForm.value;
      this.authService.setNewUser(user);
      this.router.navigate(['/auth/signup/login-data'], {
        skipLocationChange: true,
      });
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    this.authService.setNewUser(new UserSignup());
    return false;
  }
}

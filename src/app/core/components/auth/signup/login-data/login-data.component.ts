import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignup } from 'src/app/core/models/user-signup.model';
import { AuthService } from 'src/app/core/services/auth.service';

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
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      userEmail: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      }),
    });
  }

  submitForm() {
    this.authService
      .userNameExists(this.signupForm.controls.userName.value!)
      .subscribe();
    this.signupForm.markAllAsTouched();
    console.log('form submitted');
    if (this.signupForm.valid) {
      const user = <UserSignup>this.signupForm.value;
      console.log('form valid', user);
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
    return false;
  }

  userNameChange(value: string) {
    this.userName = value;
  }

  userEmailChange(value: string) {
    this.userEmail = value;
  }
}

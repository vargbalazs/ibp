import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  passwordVisible = false;
  userName = '';
  userEmail = '';
  backToBasicData = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.initSignupForm();

    this.signupForm.statusChanges.subscribe((res) => {
      if (this.signupForm.valid && !this.backToBasicData) {
        this.submitForm();
      }
    });
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
    this.signupForm.markAllAsTouched();
    console.log('form submitted');
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      console.log('form valid', user);
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { skipLocationChange: true });
    return false;
  }

  backToBasicDataForm() {
    this.signupForm.controls.userName.setValue(
      this.userName ? this.userName : this.signupForm.controls.userName.value
    );
    this.signupForm.controls.userEmail.setValue(
      this.userEmail ? this.userEmail : this.signupForm.controls.userEmail.value
    );
    this.router.navigate(['/auth/signup/basic-data'], {
      skipLocationChange: true,
      state: { user: this.signupForm.value },
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

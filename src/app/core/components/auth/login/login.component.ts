import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authroot/authroot.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: ReturnType<typeof this.initLoginForm>;

  ngOnInit(): void {
    this.loginForm = this.initLoginForm();
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

  submitForm() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
    }
  }
}

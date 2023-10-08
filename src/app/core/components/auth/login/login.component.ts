import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authroot/authroot.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: ReturnType<typeof this.initLoginForm>;
  passwordVisible = false;

  @ViewChild('password') passwordInput!: TextBoxComponent;

  constructor(private authService: AuthService, private renderer2: Renderer2) {}

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

  submitForm() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
    }
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.css'],
})
export class BasicDataComponent implements OnInit {
  userForm!: ReturnType<typeof this.initForm>;
  formData!: User;
  edit = false;
  userStatusChanged = false;
  currentUserName = '';

  @Output() successfullyUpdated: EventEmitter<User> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private notifyService: CustomNotificationService,
    private utilityService: UtilityService,
    private adminService: AdminService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.initForm();
    this.utilityService.disableAllControls(this.userForm);

    this.userForm.controls.active.valueChanges.subscribe((res) => {
      this.userStatusChanged = true;
    });

    this.userForm.controls.notLocked.valueChanges.subscribe((res) => {
      this.userStatusChanged = true;
    });

    this.userForm.statusChanges.subscribe((res) => {
      if (this.userForm.valid && this.edit && !this.userStatusChanged) {
        this.submitForm();
      }
    });
  }

  initForm() {
    this.formData = this.adminService.getUser();
    this.currentUserName = this.formData.userName!;
    return new FormGroup({
      userName: new FormControl(this.formData.userName, {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      firstName: new FormControl(this.formData.firstName, {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      lastName: new FormControl(this.formData.lastName, {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      userEmail: new FormControl(this.formData.userEmail, {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      }),
      active: new FormControl(this.formData.active),
      notLocked: new FormControl(this.formData.notLocked),
      userId: new FormControl(this.formData.userId),
    });
  }

  submitForm() {
    if (!this.edit) {
      this.utilityService.enableAllControls(this.userForm);
      this.addAsyncValidators();
      this.edit = true;
      return;
    }
    this.userStatusChanged = false;
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      this.updateUser();
      this.utilityService.disableAllControls(this.userForm);
    }
  }

  addAsyncValidators() {
    this.userForm.controls.userName.addAsyncValidators(
      this.authService.checkUserName.bind(this.authService)
    );
    this.userForm.controls.userEmail.addAsyncValidators(
      this.authService.checkUserEmail.bind(this.authService)
    );
  }

  updateUser() {
    const user = <User>this.userForm.value;
    user.currentUserName = this.currentUserName;
    this.userService.updateAsAdmin(user).subscribe((resp: User) => {
      this.notifyService.showNotification(
        5000,
        'success',
        'Sikeres módosítás!',
        'A listábana már a módosított adatok szerepelnek.'
      );
    });
    this.currentUserName = user.userName!;
    this.edit = false;
    this.successfullyUpdated.emit(user);
  }
}

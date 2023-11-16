import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/features/admin/models/user.model';
import { CreateEditComponent } from 'src/app/shared/components/create-edit/create-edit.component';

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent
  extends CreateEditComponent<User>
  implements OnInit
{
  @Output() basicDataChanged: EventEmitter<User> = new EventEmitter();

  ngOnInit(): void {}

  basicDataUpdated(user: User) {
    this.basicDataChanged.emit(user);
    this.onCancel();
  }
}

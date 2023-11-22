import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/admin/models/user.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { first, forkJoin } from 'rxjs';
import { RoleGroupService } from '../../../services/rolegroup.service';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class UserListComponent extends Crud<User> implements OnInit {
  userDetails!: User;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private roleGroupService: RoleGroupService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(userService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    this.userService.getUsers().subscribe((users) => {
      if (users) this.gridData = { data: users, total: users.length };
    });
  }

  userDetailsCancel() {
    this.userDetails = undefined!;
    this.dialogOpened = false;
  }

  updateList(user: User) {
    this.gridData.data = this.gridData.data.map((item) =>
      item.userId === user.userId ? user : item
    );
  }

  showDetails({ dataItem }: { dataItem: User }) {
    forkJoin({
      user: this.userService.getUserWithRoleGroups(dataItem).pipe(first()),
      roleGroups: this.roleGroupService
        .getRoleGroupsWithPermissions()
        .pipe(first()),
    }).subscribe(({ user, roleGroups }) => {
      this.userDetails = dataItem;
      user.allRoleGroups = roleGroups;
      this.adminService.setUser(user);
      this.dialogOpened = true;
    });
  }
}

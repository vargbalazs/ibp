import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Project } from '../../../models/project.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ProjectService } from '../../../services/project.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { first, forkJoin } from 'rxjs';
import ProjectPermissions from 'src/app/core/enums/permissions/project-perm.enum';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer.service';
import CustomerPermissions from 'src/app/core/enums/permissions/customer-perm.enum';

@Component({
  selector: 'project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProjectListComponent extends Crud<Project> implements OnInit {
  customers!: Customer[];
  projectPerm = ProjectPermissions;

  constructor(
    private projectService: ProjectService,
    private customerService: CustomerService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(projectService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    forkJoin({
      projects: this.projectService
        .getProjects(ProjectPermissions.VIEW_PROJECT)
        .pipe(first()),
      customers: this.customerService
        .getCustomers(CustomerPermissions.VIEW_CUSTOMER)
        .pipe(first()),
    }).subscribe(({ projects, customers }) => {
      if (projects) {
        this.gridData = { data: projects, total: projects.length };
        this.customers = customers;
      }
    });
  }
}

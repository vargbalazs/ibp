import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/shared/classes/crud.class';
import { Customer } from '../../../models/customer.model';
import { Bu } from '../../../models/bu.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CustomerService } from '../../../services/customer.service';
import { CustomNotificationService } from 'src/app/shared/services/notification.service';
import { MsgDialogService } from 'src/app/shared/services/dialog.service';
import { BuService } from '../../../services/bu.service';
import { first, forkJoin } from 'rxjs';
import CustomerPermissions from 'src/app/core/enums/permissions/customer-perm.enum';
import BuPermissions from 'src/app/core/enums/permissions/bu-perm.enum';

@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class CustomerListComponent extends Crud<Customer> implements OnInit {
  bus!: Bu[];
  customerPerm = CustomerPermissions;

  constructor(
    private customerService: CustomerService,
    private buService: BuService,
    loaderService: LoaderService,
    notifyService: CustomNotificationService,
    msgDialogService: MsgDialogService
  ) {
    super(customerService, notifyService, loaderService, msgDialogService);
  }

  ngOnInit(): void {
    this.gridData = { data: [], total: 0 };
    forkJoin({
      customers: this.customerService
        .getCustomers(CustomerPermissions.VIEW_CUSTOMER)
        .pipe(first()),
      bus: this.buService.getBus(BuPermissions.VIEW_BU).pipe(first()),
    }).subscribe(({ customers, bus }) => {
      if (customers) {
        this.gridData = { data: customers, total: customers.length };
        this.bus = bus;
      }
    });
  }
}

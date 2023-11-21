import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'user-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class UserPermissionsComponent implements OnInit {
  gridData!: GridDataResult;

  constructor() {}

  ngOnInit(): void {}
}

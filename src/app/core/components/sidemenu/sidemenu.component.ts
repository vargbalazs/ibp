import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { TreeViewComponent } from '@progress/kendo-angular-treeview';
import { Subscription } from 'rxjs';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { LayoutService } from '../../services/layout.service';
import { menuItems } from './sidemenu-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit, OnDestroy {
  filterTerm = '';
  menuItems: MenuItem[] = [];
  expandedKeys: string[] = [];
  selectedKeys: string[] = [];

  isItemExpanded = (_: any, index: string) =>
    this.expandedKeys.indexOf(index) > -1;

  @ViewChild('treeview') treeview!: TreeViewComponent;
  @ViewChild('searchBox') searchBox!: TextBoxComponent;

  toggleNavbar$: Subscription;

  constructor(private layoutService: LayoutService, private router: Router) {
    this.toggleNavbar$ = this.layoutService.toggleNavbar$.subscribe(() => {
      if (this.layoutService.navbarIsOpen) {
        this.expandedKeys = [];
        this.selectedKeys = [];
        this.searchBox.clearValue();
      }
    });
  }

  ngOnInit(): void {
    this.menuItems = menuItems;
  }

  nodeClick(e: any) {
    const item = e.item.dataItem as MenuItem;
    const index = e.item.index;
    if (this.isItemExpanded(item, index)) {
      this.treeview.collapseNode(item, index);
    } else {
      if (!this.layoutService.navbarIsOpen)
        this.layoutService.toggleNavBarPanel();
      {
        this.treeview.expandNode(item, index);
      }
    }
    if (item.routePath) {
      this.router.navigate([item.routePath], { skipLocationChange: true });
      this.layoutService.toggleNavBarPanel();
    }
  }

  searchBoxClicked() {
    if (!this.layoutService.navbarIsOpen)
      this.layoutService.toggleNavBarPanel();
  }

  ngOnDestroy(): void {
    this.toggleNavbar$.unsubscribe();
  }
}

import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnDestroy {
  toggleNavbar$: Subscription;

  @ViewChild('drawer') drawer!: DrawerComponent;

  constructor(private layoutService: LayoutService) {
    this.toggleNavbar$ = this.layoutService.toggleNavbar$.subscribe(() => {
      this.drawer.toggle();
    });
  }

  drawerContentClicked() {
    if (this.layoutService.navbarIsOpen) this.layoutService.toggleNavBarPanel();
  }

  ngOnDestroy(): void {
    this.toggleNavbar$.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-bar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'],
})
export class AppbarComponent {
  constructor(private layoutService: LayoutService, private router: Router) {}

  toggleNavbar() {
    this.layoutService.toggleNavBarPanel();
  }

  appBarClicked(e: any) {
    if (e.target.id !== 'toggleBtn')
      if (this.layoutService.navbarIsOpen)
        this.layoutService.toggleNavBarPanel();
  }

  showAdminArea() {
    this.router.navigate(['admin/root'], { skipLocationChange: true });
  }

  goHome() {
    this.router.navigate(['home'], { skipLocationChange: true });
  }
}

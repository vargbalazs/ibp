import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from 'src/app/features/admin/services/admin.service';

@Component({
  selector: 'app-bar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'],
})
export class AppbarComponent implements OnInit {
  isAdmin: boolean = false;
  initials = '';

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.adminService.isAdmin();
    const user = this.adminService.getUser();
    this.initials =
      user.firstName!.charAt(0).toUpperCase() +
      user.lastName!.charAt(0).toUpperCase();
  }

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

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.clearTokens();
      this.router.navigate(['auth/login'], { skipLocationChange: true });
    });
  }
}

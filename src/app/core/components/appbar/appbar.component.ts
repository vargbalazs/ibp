import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'],
})
export class AppbarComponent {
  constructor(private router: Router) {}

  toggleNavbar() {}

  appBarClicked(e: any) {}

  showAdminArea() {
    this.router.navigate(['admin/root'], { skipLocationChange: true });
  }

  goHome() {
    this.router.navigate(['home'], { skipLocationChange: true });
  }
}

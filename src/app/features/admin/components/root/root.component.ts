import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent {
  constructor(private router: Router) {}

  navigateToFunction(e: HTMLElement) {
    const func = e.getAttribute('data-function');

    switch (func) {
      case 'user':
        this.router.navigate(['admin/users'], { skipLocationChange: true });
        break;
      case 'role':
        this.router.navigate(['admin/roles'], { skipLocationChange: true });
        break;
      case 'module':
        this.router.navigate(['admin/modules'], { skipLocationChange: true });
        break;
      case 'action':
        this.router.navigate(['admin/actions'], { skipLocationChange: true });
        break;
      case 'operation':
        this.router.navigate(['admin/operations'], {
          skipLocationChange: true,
        });
        break;
      case 'permission':
        this.router.navigate(['admin/permissions'], {
          skipLocationChange: true,
        });
        break;
      case 'route':
        this.router.navigate(['admin/routes'], { skipLocationChange: true });
        break;
    }
  }
}

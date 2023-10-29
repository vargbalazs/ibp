import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LayoutService {
  private toggleNavbar = new Subject<void>();
  private navbarVisible = false;

  public toggleNavbar$ = this.toggleNavbar.asObservable();

  public get navbarIsOpen() {
    return this.navbarVisible;
  }

  toggleNavBarPanel() {
    this.toggleNavbar.next();
    this.navbarVisible = !this.navbarVisible;
  }
}

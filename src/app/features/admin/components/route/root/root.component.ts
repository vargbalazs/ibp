import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RouteRootComponent {
  loadingOverlayVisible: BehaviorSubject<boolean>;

  constructor(private loaderService: LoaderService) {
    this.loadingOverlayVisible = this.loaderService.isLoading;
  }
}

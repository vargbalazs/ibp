import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css'],
})
export class LoadingOverlayComponent {
  @Input('visible') loadingPanelVisible: boolean | null = false;
  @Input() loadingText: string = '';
}

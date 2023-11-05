import { Component, Input } from '@angular/core';

@Component({
  selector: 'infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.css'],
})
export class InfobarComponent {
  @Input() text = '';
  @Input() type: 'info' | 'error' = 'info';
}

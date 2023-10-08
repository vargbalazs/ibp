import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInRouteAnimation } from 'src/app/core/animations/slide-in-route.animation';

@Component({
  selector: 'app-authroot',
  templateUrl: './authroot.component.html',
  styleUrls: ['./authroot.component.css'],
  animations: [slideInRouteAnimation],
})
export class AuthrootComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}

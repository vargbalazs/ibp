import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContainerService {
  private currentContainer: BehaviorSubject<any>;

  constructor() {
    this.currentContainer = new BehaviorSubject<any>(null);
  }

  public setContainer(container: any) {
    this.currentContainer.next(container);
  }

  public getContainer(): any {
    return this.currentContainer.getValue();
  }
}

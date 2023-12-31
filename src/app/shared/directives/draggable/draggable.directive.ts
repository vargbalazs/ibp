import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[draggableContent]',
})
export class DraggableDirective implements AfterViewInit {
  private modalElement!: HTMLElement;
  private topStart!: number;
  private leftStart!: number;
  private isDraggable!: boolean;
  private handleElement!: HTMLElement;

  constructor(public element: ElementRef) {}

  public ngAfterViewInit() {
    let element = this.element.nativeElement;
    this.handleElement = this.element.nativeElement;
    //this.handleElement.style.cursor = 'move';
    this.modalElement = element.closest('.k-dialog');
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent) {
    if (event.button === 2 || !this.handleElement) {
      return;
    }
    if (
      event.target !== this.handleElement &&
      !this.searchParentNode(<any>event.target, this.handleElement)
    ) {
      return;
    }
    this.isDraggable = true;
    this.topStart =
      event.clientY - Number(this.modalElement.style.top.replace('px', ''));
    this.leftStart =
      event.clientX - Number(this.modalElement.style.left.replace('px', ''));
    event.preventDefault();
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
    this.isDraggable = false;
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (this.isDraggable) {
      this.modalElement.style.top = event.clientY - this.topStart + 'px';
      this.modalElement.style.left = event.clientX - this.leftStart + 'px';
    }
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: MouseEvent) {
    this.isDraggable = false;
  }

  private searchParentNode(element: Node, tag: Node): Node | null {
    while (element.parentNode) {
      element = element.parentNode;
      if (element === tag) {
        return element;
      }
    }
    return null;
  }
}

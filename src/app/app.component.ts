import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('visualisePos') public visualisePos: ElementRef;

  private _renderer2: Renderer2;
  private _dragElement: Element = null;
  private _dragOffsetX: number;
  private _dragOffsetY: number;
  private _mouseX: number;
  private _mouseY: number;

  constructor(renderer2: Renderer2) {
    this._renderer2 = renderer2;
  }

  public updateBoxPosition(el: Element): void {
    this.visualisePosition(
      this._mouseX - this._dragOffsetX,
      this._mouseY - this._dragOffsetY
    );

    const xPos = this._mouseX - this._dragOffsetX;
    const yPos = this._mouseY - this._dragOffsetY;

    this._renderer2.setStyle(el, 'left', xPos + 'px');
    this._renderer2.setStyle(el, 'top', yPos + 'px');
  }

  public clearBoxPosition(el: Element): void {
    this._renderer2.setStyle(el, 'left', 0);
    this._renderer2.setStyle(el, 'top', 0);
  }

  public isDragActive(): boolean {
    return !!this._dragElement;
  }

  public mouseDownHandler(ev: MouseEvent): void {
    const target = ev.target as HTMLDivElement;

    if (!target.classList.contains('draggable') || ev.button !== 0) {
      return;
    }

    console.log('[ev] mouseDown', ev);

    // this.visualisePosition(ev.pageX, ev.pageY);

    this._dragOffsetX = ev.pageX - target.offsetLeft;
    this._dragOffsetY = ev.pageY - target.offsetTop;

    this._dragElement = target;
    this._dragElement.classList.add('dragging');
  }

  public mouseUpHandler(ev: MouseEvent): void {
    console.log('[ev] mouseUp');

    if (!this.isDragActive()) {
      return;
    }

    console.log(
      'elements under point',
      document.elementsFromPoint(ev.pageX, ev.pageY)
    );

    this.clearBoxPosition(this._dragElement);
    this._dragElement.classList.remove('dragging');
    this._dragElement = null;
  }

  public dragHandler(ev: Event): void {
    console.log('[ev] drag');
  }

  public mouseMoveHandler(ev: MouseEvent): void {
    if (!this.isDragActive()) {
      return;
    }

    this._mouseX = ev.clientX;
    this._mouseY = ev.clientY;

    this.updateBoxPosition(this._dragElement);
  }

  public visualisePosition(x: number, y: number) {
    this._renderer2.setStyle(
      this.visualisePos.nativeElement,
      'left',
      x - 3 + 'px'
    );
    this._renderer2.setStyle(
      this.visualisePos.nativeElement,
      'top',
      y - 3 + 'px'
    );
  }
}

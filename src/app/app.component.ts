import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('box') public box: ElementRef;

  private _renderer2: Renderer2;
  private _dragElement: Element = null;
  private _dragOffsetX: number;
  private _dragOffsetY: number;
  private _mouseX: number;
  private _mouseY: number;

  constructor(renderer2: Renderer2) {
    this._renderer2 = renderer2;
  }

  public setBoxColour(el: EventTarget, colour: string): void {
    this._renderer2.setStyle(el, 'background-color', colour);
  }

  public updateBoxPosition(el: EventTarget): void {
    const xPos = this._mouseX - this._dragOffsetX;
    const yPos = this._mouseY - this._dragOffsetY;

    this._renderer2.setStyle(el, 'left', xPos + 'px');
    this._renderer2.setStyle(el, 'top', yPos + 'px');
  }

  public startDrag(el: Element): void {
    this._dragElement = el;
  }

  public endDrag(): void {
    this._dragElement = null;
  }

  public isDragActive(): boolean {
    return !!this._dragElement;
  }

  public mouseDownHandler(ev: MouseEvent): void {
    const target = ev.target as HTMLDivElement;

    if (!target.classList.contains('draggable')) {
      return;
    }

    console.log('[ev] mouseDown', ev);

    this._dragOffsetX = ev.clientX - target.offsetLeft;
    this._dragOffsetY = ev.clientY - target.offsetTop;

    this.startDrag(target);
    this.setBoxColour(this._dragElement, 'green');
  }

  public mouseUpHandler(ev: Event): void {
    console.log('[ev] mouseUp');

    if (this.isDragActive()) {
      this.setBoxColour(this._dragElement, 'blue');
    }

    this.endDrag();
  }

  public dragHandler(ev: Event): void {
    console.log('[ev] drag');
  }

  public mouseMoveHandler(ev: MouseEvent): void {
    // console.log('[ev] mouseMove');

    if (!this.isDragActive()) {
      return;
    }

    this._mouseX = ev.clientX;
    this._mouseY = ev.clientY;

    this.updateBoxPosition(this._dragElement);
  }
}

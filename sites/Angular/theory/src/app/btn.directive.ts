import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBtn]'
})
export class BtnDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.background = 'green';
  }

}

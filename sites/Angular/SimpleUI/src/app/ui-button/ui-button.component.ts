import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.css']
})
export class UiButtonComponent implements OnInit {

  public label = 'Hello';

  constructor(private myElement: ElementRef) { }

  ngOnInit() {
    console.log(this.myElement.nativeElement);
  }

}

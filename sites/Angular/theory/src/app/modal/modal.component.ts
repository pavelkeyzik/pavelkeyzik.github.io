import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {

  private hidden:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

}

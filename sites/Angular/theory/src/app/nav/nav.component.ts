import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  @ViewChild(ModalComponent) modalWindow: ModalComponent;

  constructor() { }

  ngOnInit() {
  }

  showWindow() {
    this.modalWindow.show();
  }

}

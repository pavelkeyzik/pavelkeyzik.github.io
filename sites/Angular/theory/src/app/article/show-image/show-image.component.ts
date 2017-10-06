import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.less'],
  animations: [
    trigger('showImageState', [
      state('closed', style({
        visibility: 'hidden'
        // opacity: '0'
      })),
      state('opened', style({
        visibility: 'visible'
        // opacity: '0'
      })),
      transition(':enter', [
        style({
          visibility: 'hidden',
          opacity: 0
        }),
        animate('100ms ease-in', style({
          visibility: 'visible',
          opacity: '0.5'
        }))
      ]),
      transition(':leave', [
        animate('100ms ease-out', style({
          opacity: 0.2
        }))
      ])
    ])
  ]
})
export class ShowImageComponent implements OnInit {

  imgUrl;
  private hidden = true;
  imageState = 'closed';

  constructor() { }

  ngOnInit() {
  }

  show(url: string) {
    this.hidden = false;
    this.imgUrl = url;
    this.imageState = 'opened';
  }

  hide() {
    this.hidden = true;
    this.imageState = 'closed';
  }

}

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.less'],
  animations: [
    trigger('showImageState', [
      state('closed', style({
        visibility: 'hidden',
        opacity: '0'
      })),
      state('opened', style({
        visibility: 'visible',
        opacity: '1'
      })),
      transition('closed => opened', animate('100ms ease-in')),
      transition('opened => closed', animate('100ms ease-out'))
    ])
  ]
})
export class ShowImageComponent implements OnInit {

  imgUrl:string = 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/05/Facebook_TNW-1.jpg';
  private hidden: boolean = true;
  imageState:string = 'closed';

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

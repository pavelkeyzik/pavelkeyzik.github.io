import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {trigger, state, animate, transition, style} from '@angular/animations';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less'],
  animations: [
    trigger('droppedState', [
      state('false', style({
        maxHeight: '0',
        overflow: 'hidden'
      })),
      state('true', style({
        maxHeight: '300px'
      })),
      transition('0 => 1', animate('100ms ease-in')),
      transition('1 => 0', animate('100ms ease-out'))
    ]),
    trigger('rotateIcon', [
      state('down', style({
        transform: 'rotate(90deg)'
      })),
      state('right', style({
        transform: 'rotate(0)'
      })),
      transition('right => down', animate('100ms ease-in')),
      transition('down => right', animate('100ms ease-out'))
    ])
  ],
  providers: [UsersService]
})
export class UserDetailComponent implements OnInit {

  user;
  dropped: boolean = false;
  rotateIconState: string = 'right';

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.usersService.getUsers().subscribe(user => this.user = user.results[0]);
  }

  toggleDropped() {
    this.dropped = !this.dropped;

    if (this.rotateIconState === 'right') {
      this.rotateIconState = 'down';
    } else {
      this.rotateIconState = 'right';
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less'],
  providers: [UsersService]
})
export class CreateUserComponent implements OnInit {
  private userName:string = '';
  private userAvatar:string = '';
  private userOnline:boolean = false;


  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  create(event: Event) {
    // event.preventDefault();

    let user = {
      name: this.userName,
      avatar: this.userAvatar,
      online: this.userOnline
    }
    this.usersService.create(user);
  }
}

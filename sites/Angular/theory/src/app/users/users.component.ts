import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  users;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers(5);
  }

  private getUsers(count: number) {
    this.usersService.getUsers(count).subscribe(data => this.users = data.results);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
	private newLogin:string = '';
	private newPassword:string = '';
	private errorMessage:string = '';

	constructor(private usersService: UsersService,
				private router: Router) {}

	ngOnInit() {
	}

	private validateForm() {
		this.usersService.getUser(this.newLogin)
						 .subscribe(user => this.checkUser(user, this.newLogin, this.newPassword),
								 	error => this.errorMessage = 'Пользователь не найден!');
	}

	private checkUser(user, login, password) {
		if(user && user.login === login && user.password === password) {
 			this.router.navigate(['/conversations', user.login]);
 		} else {
 			this.errorMessage = 'Неверно введён пароль!';
 		}
	}
}

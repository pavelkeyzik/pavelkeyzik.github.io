import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
	private user;

	constructor() {
		this.user = {
			login: 'admin',
			password: '1111'
		}
	}

	ngOnInit() {
		console.log(this.user);
	}

}

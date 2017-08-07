import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class UsersService {

	private apiBaseUrl: string = 'http://localhost:3012/users';

	constructor(private http: Http) {}

	getUsers() {
		return this.http.get(this.apiBaseUrl)
						.map(res => res.json());
	}

	getUser(user) {
		return this.http.get(this.apiBaseUrl + '/' + user)
						.map(res => res.json());
	}
}
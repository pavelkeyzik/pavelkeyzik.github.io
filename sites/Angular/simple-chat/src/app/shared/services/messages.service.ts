import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessagesService {
	private apiBaseUrl:string = 'http://localhost:3012/messages';

	constructor(private http: Http) {}

	getMessages(me_login, user_login) {
		return this.http.get(this.apiBaseUrl + '/' + me_login + '/' + user_login)
						.map(res => res.json());
	}

	sendMessage(message, me_login, user_login) {
		return this.http.post(this.apiBaseUrl + '/' + me_login + '/' + user_login, message);
	}
}
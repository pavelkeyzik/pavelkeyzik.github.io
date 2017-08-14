import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConversationsService {
	private apiBaseUrl:string = 'http://localhost:3012/conversations';

	constructor(private http: Http) {}

	getConversations(me_login: string) {
		return this.http.get(this.apiBaseUrl + '/' + me_login)
						.map(data => data.json());
	}

	updateConversations(object, me_login, user_login) {
		return this.http.post(this.apiBaseUrl + '/' + me_login + '/' + user_login, object);
	}
}
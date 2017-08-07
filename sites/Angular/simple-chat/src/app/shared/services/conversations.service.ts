import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConversationsService {
	private apiBaseUrl = 'http://localhost:3012/conversations';

	constructor(private http: Http) {}

	getConversations(me_login: string) {
		return this.http.get(this.apiBaseUrl + '/' + me_login)
						.map(data => data.json());
	}
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MessagesService } from '../shared/services/messages.service';
import { ConversationsService } from '../shared/services/conversations.service';
import { UsersService } from '../shared/services/users.service';

@Component({
	selector: 'messages',
	templateUrl: './messages.component.html',
	styleUrls: [
		'./messages.component.less'
	],
	providers: [
		MessagesService,
		ConversationsService,
		UsersService
	]
})
export class MessagesComponent implements OnInit {
	private me_user;
	private friend_user;
	private messages;
	private newMessage:string = '';
	private refresh = true;

	constructor(private route: ActivatedRoute,
				private messagesService: MessagesService,
				private conversationsService: ConversationsService,
				private usersService: UsersService) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.getUsers(params.me_login, params.user_login);
			this.getMessages(params.me_login, params.user_login);
		});
	}

	ngOnDestroy() {
		this.refresh = false;
	}

	private getMessages(me_login, user_login) {
		this.messagesService.getMessages(me_login, user_login).subscribe(messages => { 
			if(this.refresh) {
				this.messages = messages;
				this.refreshMessages(me_login, user_login);
			}
		});
	}

	private refreshMessages(me_login, user_login) {
		setTimeout(() => this.getMessages(me_login, user_login), 5000);
	}

	private getUsers(me_login, user_login) {
		this.usersService.getUser(me_login).subscribe(user => this.me_user = user,
												   error => this.me_user = undefined);

		this.usersService.getUser(user_login).subscribe(user => this.friend_user = user,
													 error => this.friend_user = undefined);
	}

	private sendMessage() {
		if(this.newMessage) {
			let message = {
				user_name: this.me_user.name,
				text: this.newMessage,
				date: new Date().toString()
			}
			this.messagesService.sendMessage(message, this.me_user.login, this.friend_user.login)
								.subscribe(success => {
												message["message_from"] = this.me_user.login;
												this.messages.push(message);
												this.upgradeConversations(this.me_user.login, this.friend_user.login);
										   },
										   error => console.log('Плохо всё'));
		}
	}

	private upgradeConversations(me_login, user_login) {
		let message = {
			latest_message: this.newMessage,
			date: new Date().toString()
		}
		this.conversationsService.updateConversations(message, me_login, user_login).subscribe();
	}

}
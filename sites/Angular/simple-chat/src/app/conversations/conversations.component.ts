import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../shared/services/users.service';
import { ConversationsService } from '../shared/services/conversations.service';

@Component({
	selector: 'app-conversations',
	templateUrl: './conversations.component.html',
	styleUrls: ['./conversations.component.less'],
	providers: [
		ConversationsService,
		UsersService
	]
})
export class ConversationsComponent implements OnInit {
	private conversations;
	private user;
	private refresh;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private conversationsService: ConversationsService,
				private usersService: UsersService) {}

	ngOnInit() { 
		let me_login;

		this.route.params.subscribe(data => me_login = data.me_login);

		this.usersService.getUser(me_login).subscribe(data => {
														this.refresh = true;
														this.getConversations(data.login);
														this.user = data;
													});
	}

	ngOnDestroy() {
		this.refresh = false;
	}

	private getConversations(me_login: string) {
		this.conversationsService.getConversations(me_login).subscribe(conversations => {
			if(this.refresh) {
				this.conversations = conversations;
				this.refreshConversations();
			}
		});
	}

	private refreshConversations() {
		setTimeout(() => this.getConversations(this.user.login), 5000);
	}
}
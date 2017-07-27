import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../shared/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  providers: [MessagesService]
})
export class MessagesComponent implements OnInit {
  private messages: any;
  private sectionTitle: string = 'Messages';

  constructor(private messagesService : MessagesService) { }

  ngOnInit() {
    this.loadListOfMessages();
  }

  private loadListOfMessages() {
    this.messagesService.getData().subscribe(data => this.messages = data);
  }

}

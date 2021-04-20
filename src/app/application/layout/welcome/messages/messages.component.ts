import { Component, OnInit } from '@angular/core';
import { Message } from '../../../../models/message';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  allMessages: Message[] = []

  ngOnInit() {
    this.getActiveMessages();
  }

  private getActiveMessages(): void {
    this.messageService.getActiveMessages().subscribe(
      res => {
        this.allMessages = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

}
